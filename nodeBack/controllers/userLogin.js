const database = require("../helpers/databaseController");
const multiparty = require("multiparty");
const bcrypt = require("bcrypt");

const checkLogin = (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) =>{
        let {username, password} = fields;
        username = username[0];
        password = password[0];
        let hash = bcrypt.hashSync(password, 15);
        let query = "SELECT password FROM users WHERE username = $1";
        let params = [username];
        database.query(query, params, (error, success) => {
            if (error){
                res.status(500).send(error);
            }
            else{
                if (success.rows.length < 1) {
                    res.status(403).send("User not found.");
                }
                else{
                    if (success.rows[0].password !== hash){
                        res.status(403).send("Incorrect password.");
                    }else{
                        let session = req.session;
                        session.name = username;
                        res.status(200).send({'message':'ok'});
                    }
                }
            }
        })
    })
}

const connected = (req, res) => {
    let session = req.session;
    if (session.name){ 
        res.status(200).send("True");
    }else {
        res.status(200).send("False");
    }
}

const closeSession = (req, res) => {
    req.session.destroy(err => {
        if (err) res.status(500).send(err);
        res.status(200).send("Logged out");
    });
}

module.exports = {
    checkLogin, 
    connected, 
    closeSession
}