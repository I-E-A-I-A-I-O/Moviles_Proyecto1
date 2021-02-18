const db = require("../helpers/databaseController");
const mp = require("multiparty");
const bcrypt = require("bcrypt");
const fs = require("fs");

const userRegistration = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (err, fields, files) => {
        if (err){
            res.status(503).send(err);
        }
        else{
            let {username, password, email, age, gender} = fields;
            password = bcrypt.hashSync(password[0], 15);
            let params = [username[0], password, "regular", email[0], age[0], gender[0]];
            checkDuplicates(params, files, res);
        }
    })
}

const setAvatar = (params, file, response) => {
    let type = file.avatar[0].originalFilename.split(".")[1];
    console.log(file.avatar[0].originalFilename);
    let filePath = "media/avatars/" + params[0];
    fs.mkdirSync(filePath);
    let absolutePath = filePath + "/avatar." + type;
    fs.readFile(file.avatar[0].path, (err, data) => {
        if (err) res.status(503).send(err);
        else{
            fs.writeFile(absolutePath, data, (writeError) => {
                if (writeError) console.log(writeError);
                else{
                    let text = "INSERT INTO users(username, password, role, email, age, gender, avatar) VALUES($1, $2, $3, $4, $5, $6, $7)"
                    params.push(absolutePath);
                    db.query(text, params, (err1, res) => {
                        if (err1){
                            let obj = {
                                title: "Error",
                                content: err1.message
                            }
                            response.contentType("application/json");
                            response.status(500).send(JSON.stringify(obj));
                        }
                        else{
                            let obj = {
                                title: "Success",
                                content: "Account created"
                            }
                            response.contentType("application/json");
                            response.status(200).send(JSON.stringify(obj));
                        }
                    })
                }
            })
            fs.unlink(file.avatar[0].path, (unlinkError) => {
                if (unlinkError) console.log(unlinkError);
            });
        }
    })
}

const checkDuplicates = (params, file, response) => {
    let text = "SELECT username FROM users WHERE username = $1";
    let queryParams = [params[0]];
    db.query(text, queryParams, (err1, res) => {
        if (err1) response.status(400).send(JSON.stringify('{"message":"' + err1.message + '"}'));
        else{
            if (res.rowCount > 0){
                let obj = {
                    title: "Error",
                    content: "Username not available"
                }
                response.contentType("application/json");
                response.status(400).send(JSON.stringify(obj));
            }
            else{
                if (file.avatar){
                    setAvatar(params, file, response);
                }
                else{
                    text = "INSERT INTO users(username, password, role, email, age, gender) VALUES($1, $2, $3, $4, $5, $6)"
                    db.query(text, params, (err2) => {
                        if (err2){
                            let obj = {
                                title: "Error",
                                content: err2.message
                            }
                            response.contentType("application/json");
                            response.status(503).send(JSON.stringify(obj));
                        }
                        else{
                            let obj = {
                                title: "Success",
                                content: "Account created"
                            }
                            response.contentType("application/json");
                            response.status(200).send(JSON.stringify(obj));
                        }
                    })
                }
            }
        }
    })
}

module.exports = {
    userRegistration
}