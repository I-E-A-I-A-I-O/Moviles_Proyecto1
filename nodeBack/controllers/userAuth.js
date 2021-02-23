const db = require("../helpers/databaseController");
const mp = require("multiparty");
const bcrypt = require("bcrypt");
const fs = require("fs");
const fse = require("fs-extra");

const userRegistration = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (err, fields, files) => {
        if (err){
            res.status(503).send(err);
        }
        else{
            let { username, password, email, age, gender } = fields;
            let salt = bcrypt.genSaltSync();
            password = bcrypt.hashSync(password[0], salt);
            let params = [username[0], password, "regular", email[0], age[0], gender[0]];
            checkDuplicates(params, files, res);
        }
    })
}

const setAvatar = async (file, params) => {
    let type = file.avatar[0].originalFilename.split(".")[1];
    let filePath = "media/avatars/" + params[0];
    let absolutePath = filePath + "/avatar." + type;
    try{
        if (fs.existsSync(filePath)){
            await fse.emptyDir(filePath);
        }
        else{
            fs.mkdirSync(filePath, {recursive: true});
        }
        let content = fs.readFileSync(file.avatar[0].path);
        fs.writeFileSync(absolutePath, content);
        fs.unlinkSync(file.avatar[0].path);
        return {title:"Success", content:absolutePath};
    }catch(e){
        console.log(e);
        return {title:"Error", content:""};
    }
}

const checkDuplicates = async (params, file, res) => {
    let client = await db.getClient();
    let results;
    let text = "SELECT username FROM users WHERE username = $1";
    let queryParams = [params[0]];
    try{
        results = await client.query(text, queryParams);
        if(results.rowCount > 0){
            res.status(400).json({title: "Error", content:"Username not available"});
        }
        else{
            if (file.avatar){
                let status = await setAvatar(file, params);
                if (status.title == "Error"){
                    res.status(500).json({title: status, content:"Account couldn't be created"});
                }
                else{
                    text = "INSERT INTO users(username, password, role, email, age, gender, avatar) VALUES($1, $2, $3, $4, $5, $6, $7)"
                    params.push(status.content);
                    await client.query(text, params);
                    res.status(200).json({title: status.title, content:"Account created"});
                }
            }
            else{
                text = "INSERT INTO users(username, password, role, email, age, gender) VALUES($1, $2, $3, $4, $5, $6)"
                client.query(text, params);
                res.status(200).json({title:"Success", content:"Account created"});
            }
        }
    }catch(e){
        console.log(e);
        res.status(500).json({title: "Error", content: "Error creating the account"});
    }
    finally{
        await client.release();
    }
}

module.exports = {
    userRegistration
}