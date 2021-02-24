const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");
const multiparty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const editUsername = async(req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let form = new multiparty.Form();
        form.parse(req, (error, fields) => {
            if (error) res.status(500).json({title: "Error", content: error.message});
            else{
                let { username, password } = fields;
                username = username[0];
                password = password[0];
                setChanges(res, "username", username, result.username, password);
            }
        })
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const setChanges = async (res, column, newData, filter, password) => {
    let correct = await verifyPassword(password, filter);
    let newToken = "";
    if (correct){
        let queryStatus = await updateData(column, filter, newData);
        if (queryStatus){
            if (column == "username"){
                newToken = jwt.sign({role: result.role, username: newData}, process.env.TOKEN_SECRET);
                tokenVerifier.invalidateToken(token);
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
    editUsername
}