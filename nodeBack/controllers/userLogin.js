const database = require("../helpers/databaseController");
const multiparty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const { param } = require("../routers/userAuth");

const checkLogin = (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) =>{
        let {username, password} = fields;
        username = username[0];
        password = password[0];
        let query = "SELECT password, role FROM users WHERE username = $1";
        let params = [username];
        let obj = {
            title: "",
            content: "",
            role: ""
        }
        database.query(query, params, (error, success) => {
            if (error){
                res.status(500).send(error);
            }
            else{
                if (success.rows.length < 1) {
                    obj.title = "Error";
                    obj.content = "User not found."
                    res.contentType("application/json");
                    res.status(403).send(JSON.stringify(obj));
                }
                else{
                    if (!bcrypt.compareSync(password, success.rows[0].password)){
                        obj.title = "Error";
                        obj.content = "Incorrect password";
                        res.contentType("application/json");
                        res.status(403).send(JSON.stringify(obj));
                    }else{
                        const token = jwt.sign({ name: username, role: success.rows[0].role }, process.env.TOKEN_SECRET);
                        req.session.token = token;
                        res.contentType("application/json");
                        obj.title = "Success";
                        obj.content = "Login successul";
                        obj.role = success.rows[0].role;
                        res.status(200).send(JSON.stringify(obj));
                    }
                }
            }
        })
    })
}
const connected = async (req, res) => {
    let token = req.session.token;
    let result = await verifyToken(token);
    var obj = {}
    if (result.connected){
        obj.title = "Success";
        obj.content = "User is connected"
    }
    else{
        obj.title = "Error";
        obj.content = "Invalid token"
    }
    res.contentType("application/json");
    res.status(200).send(JSON.stringify(obj));
}
const verifyToken = async (token) => {
    let obj = {
        username: "",
        role: "",
        connected: false
    }
    if (!token){
        return obj;
    }
    else{
        let bool = await invalidToken(token);
        if (bool) return obj;
        else{
            try {
                const verified = jwt.verify(token, process.env.TOKEN_SECRET)
                obj.username = verified.username;
                obj.role = verified.role;
                obj.connected = true;
                return obj;
            } catch (error) {
                return obj;
            }
        }
    }
}
const closeSession = (req, res) => {
    let token = req.session.token;
    let text = "INSERT INTO invalidtokens(token) VALUES($1)";
    let params = [token]
    database.query(text, params, (err, res) => {});
    req.session.destroy(err => {
        if (err) res.status(500).send(err);
        res.status(200).send("Logged out");
    });
}
const invalidToken = async (token) => {
    let text = "SELECT token FROM invalidTokens WHERE token = $1";
    let params = [token];
    let data = await database.queryAsync(text, params);
    return data.rowCount > 0;
}
module.exports = {
    checkLogin, 
    connected, 
    closeSession
}