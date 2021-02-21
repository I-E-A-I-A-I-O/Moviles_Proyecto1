const database = require("../helpers/databaseController");
const multiparty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const { verifyToken } = require("../helpers/tokenVerifier")

const checkLogin = async(req, res) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields) =>{
        let { username, password } = fields;
        username = username[0];
        password = password[0];
        loginResponse(username, password, res);
    })
}

const loginResponse = async (username, password, res) => {
    let query = "SELECT password, role FROM users WHERE username = $1";
    let params = [username];
    let results;
    let client = await database.getClient();
    try{
        results = await client.query(query, params);
        if (results.rows.length < 1){
            res.status(404).json({title: "Error", content: "Username not found"});
        }
        else{
            let same = await bcrypt.compare(password, results.rows[0].password);
            if (!same){
                res.status(403).json({title: "Error", content: "Incorrect password"});
            }
            else{
                let token = jwt.sign({ name: username, role: results.rows[0].role }, process.env.TOKEN_SECRET)
                res.status(200).json({title:"Success", content:"Login successful", token: token, role: results.rows[0].role});
            }
        }
    }catch{
        res.status(500).json({title: "Error", content:"Login failed"});
    }finally{
        await client.release();
    }
}

const connected = async (req, res) => {
    let token = req.headers.authtoken;
    let result = await verifyToken(token);
    if (result.connected){
        res.status(200).json({title:"Success", content:"User is connected"});
    }
    else{
        res.status(200).json({title:"Error", content:"Invalid token"});
    }
}

const closeSession = async(req, res) => {
    let token = req.headers.authtoken;
    let client = await database.getClient();
    let text = "INSERT into invalidTokens(token) VALUES($1)";
    let params = [token];
    try{
        await client.query(text, params);
        res.status(200).json({title: "Success", content:"Session closed"});
    }catch{
        res.status(500).json({title: "Error", content:"Token invalidation failed"});
    }finally{
        client.release();
    }
}
module.exports = {
    checkLogin, 
    connected, 
    closeSession
}