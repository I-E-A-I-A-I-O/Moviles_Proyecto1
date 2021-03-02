const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");
const multiparty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fse = require("fs-extra");

const { setAvatar, checkDuplicate } = require("./userAuth")

const editUsername = async(req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let form = new multiparty.Form();
        form.parse(req, (error, fields) => {
            if (error){
              console.log(error);
              res.status(500).json({title: "Error", content: error.message});
            }
            else{
                let { username, password } = fields;
                username = username[0];
                password = password[0];
                checkDuplicate(username).then(bool => {
                    if (!bool){
                        setChanges(res, "username", username, result, password, token);
                    }
                    else{
                        res.status(400).json({title: "Error", content: "Username not available"});
                    }
                })
            }
        })
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const editEmail = async(req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let form = new multiparty.Form();
        form.parse(req, (error, fields) => {
            if (error) res.status(500).json({title: "Error", content: error.message});
            else{
                let { email, password } = fields;
                email = email[0];
                password = password[0];
                setChanges(res, "email", email, result, password, token);
            }
        })
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const editGender = async(req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let form = new multiparty.Form();
        form.parse(req, (error, fields) => {
            if (error) res.status(500).json({title: "Error", content: error.message});
            else{
                let { gender, password } = fields;
                gender = gender[0];
                password = password[0];
                setChanges(res, "gender", gender, result, password, token);
            }
        })
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const editPassword = async(req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let form = new multiparty.Form();
        form.parse(req, (error, fields) => {
            if (error) res.status(500).json({title: "Error", content: error.message});
            else{
                let { newPassword, currentPassword } = fields;
                let salt = bcrypt.genSaltSync();
                newPassword = bcrypt.hashSync(newPassword[0], salt);
                currentPassword = currentPassword[0];
                setChanges(res, "password", newPassword, result, currentPassword, token);
            }
        })
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const editAge = async(req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let form = new multiparty.Form();
        form.parse(req, (error, fields) => {
            if (error) res.status(500).json({title: "Error", content: error.message});
            else{
                let { age, password } = fields;
                age = age[0];
                password = password[0];
                setChanges(res, "age", age, result, password, token);
            }
        })
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const moveAvatar = async (oldUsername, username) => {
    let client = await database.getClient();
    try{
        let query = "SELECT avatar FROM users WHERE username = $1";
        let params = [username];
        let result = await client.query(query, params);
        if (result.rowCount > 0){
            try{
                let oldPath = result.rows[0].avatar;
                let extension = oldPath.split(".")[1];
                let newPath = `media/avatars/${username}/avatar.${extension}`;
                await fse.move(oldPath, newPath);
                await fse.remove(`media/avatars/${oldUsername}`);
                query = "UPDATE users SET avatar = $1 WHERE username = $2";
                params = [newPath, username];
                await client.query(query, params);
            }catch(e){
                console.log(e);
            }
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.release();
    }
}

const editAvatar = async (req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let form = new multiparty.Form();
        form.parse(req, (error, fields, files) => {
            if (error) res.status(500).json({title: "Error", content: error.message});
            else{
                setAvatarChanges(res, files, result.username);
            }
        })
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const setAvatarChanges = async (res, files, username) => {
    let avatarResult = await setAvatar(files, username);
    if (avatarResult.title == "Error"){
        res.status(500).json({title: "Error", content: avatarResult.content});
    }
    else{
        let success = await updateData("avatar", username, avatarResult.content);
        if (success){
            res.status(200).json({title: "Success", content:"Avatar updated"});
        }
        else{
            res.status(500).json({title:"Error", content:"Avatar couldn't be updated"});
        }
    }
}

const setChanges = async (res, column, newData, filter, password, token) => {
    let correct = await verifyPassword(password, filter.username);
    let newToken = "";
    if (correct){
        let queryStatus = await updateData(column, filter.username, newData);
        if (queryStatus){
            if (column == "username"){
                newToken = jwt.sign({role: filter.role, name: newData}, process.env.TOKEN_SECRET);
                tokenVerifier.invalidateToken(token);
                moveAvatar(filter.username, newData);
            }
            res.status(200).json({title: "Success", token: newToken, content:`${column} updated`});
        }
        else{
            res.status(500).json({title:"Error", content:`Error updating the ${column}`});
        }
    }
    else{
        res.status(403).json({title:"Error", content:"Incorrect password"});
    }
}

const verifyPassword = async (password, username) => {
    let client = await database.getClient();
    let query = "SELECT password FROM users WHERE username = $1";
    let params = [username];
    try{
        let results = await client.query(query, params);
        if (results.rowCount < 1) return false;
        else{
            return await bcrypt.compare(password, results.rows[0].password);
        }
    }catch(e){
        console.log(e);
        return false;
    }finally{
        await client.release();
    }
}

const updateData = async (column, filter, newData) => {
    let client = await database.getClient();
    let query = `UPDATE users SET ${column} = $1 WHERE username = $2`;
    let params = [newData, filter];
    try{
        await client.query(query, params);
        return true;
    }catch(e){
        console.log(e);
        return false;
    }finally{
        await client.release();
    }
}

module.exports = {
    editUsername,
    editEmail,
    editGender,
    editPassword,
    editAge,
    editAvatar
}
