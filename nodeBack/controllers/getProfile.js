const tokenVerifier = require("../helpers/tokenVerifier")
const database = require("../helpers/databaseController")
const fs = require("fs");

const serveProfile = async (req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let text = "SELECT username, age, gender, email FROM users WHERE username = $1";
        let params = [result.username];
        let client = await database.getClient();
        let results;
        try{
            results = await client.query(text, params);
            res.status(200).json(results.rows[0]);
        }catch{
            res.status(500).json({title:"error", content:"Database query error"});
        }
        finally{
            await client.release();
        }
    }
    else{
        res.status(403).json({title: "Error", content:"Login first"});
    }
}

const serveAvatar = async (req, res) => {
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        let text = "SELECT avatar FROM users WHERE username = $1";
        let params = [result.username];
        let results;
        let client = await database.getClient();
        try{
            results = await client.query(text, params);
            if (!results.rows[0].avatar){
                res.status(200).json(results.rows[0].avatar);
            }
            else{
                let path = results.rows[0].avatar;
                let mime = "image/" + path.split(".")[1]
                fs.readFile(path, {encoding: "base64"}, (readError, data) => {
                    if (readError){
                        res.status(500).json({title:"error", content:readError.message});
                    }
                    else{
                        const dataUrl = `data:${mime};base64,${data}`;
                        res.status(200).json({title: "Success", content:"Avatar", avatar:dataUrl});
                    }
                })
            }
        }catch{
            res.status(500).json({title: "Error", content:"Database query error"});
        }
        finally{
            await client.release();
        }
    }
    else{
        res.status(403).json({title: "Error", content:"Login first"});
    }
}

module.exports = {
    serveProfile,
    serveAvatar
}