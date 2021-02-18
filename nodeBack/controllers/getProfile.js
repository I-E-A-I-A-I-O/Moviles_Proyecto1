const tokenVerifier = require("../helpers/tokenVerifier")
const database = require("../helpers/databaseController")
const fs = require("fs");

const serveProfile = async (req, res) => {
    let token = req.session.token;
    let result = await tokenVerifier.verifyToken(token);
    let text = "SELECT username, avatar, age, gender, email FROM users WHERE username = $1";
    let params = [result.username];
    database.query(text, params, (err, results) => {
        if (err){
            res.status(503).json({title:"error", content:err.message})
        }
        else{
            let obj = results.rows[0];
            if (!obj.avatar){
                res.status(200).send(JSON.stringify(obj));
            }
            else{
                let path = obj.avatar;
                let mime = "image/" + path.split(".")[1]
                fs.readFile(path, {encoding: "base64"}, (readError, data) => {
                    if (readError){
                        res.status(503).json({title:"error", content:readError.message});
                    }
                    else{
                        const dataUrl = `data:${mime};base64,${data}`;
                        obj.avatar = dataUrl;
                        res.status(200).send(JSON.stringify(obj));
                    }
                })
            }
        }
    })
}

module.exports = {
    serveProfile
}