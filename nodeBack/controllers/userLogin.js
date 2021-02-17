const database = require("../helpers/databaseController");
const multiparty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");

const checkLogin = (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) =>{
        let {username, password} = fields;
        username = username[0];
        password = password[0];
        let hash = bcrypt.hashSync(password, 15);
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
                    if (success.rows[0].password !== hash){
                        obj.title = "Error";
                        obj.content = "Incorrect password";
                        res.contentType("application/json");
                        res.status(403).send(JSON.stringify(obj));
                    }else{
                        const token = jwt.sign({ name: username, pass: password }, process.env.TOKEN_SECRET);
                        res.header('auth-token', token).json({error: null,data: { token }})
                        res.contentType("application/json");
                        obj.title = "Success";
                        obj.content = "Login successul";
                        obj.role = success.rows[0].role;
                        res.contentType("application/json");
                        res.status(200).send(JSON.stringify(obj));
                    }
                }
            }
        })
    })
}

const connected = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
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