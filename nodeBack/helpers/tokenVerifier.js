const jwt = require("jsonwebtoken");
const database = require("./databaseController")

const invalidToken = async (token) => {
    let client = await database.getClient();
    let bool = true;
    try{
        let text = "SELECT token FROM invalidTokens WHERE token = $1";
        let params = [token];
        let results = await client.query(text, params);
        if (results.rows.length < 1) { bool = false }
    }finally{
        await client.release();
    }
    return bool;
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
        let invalid = await invalidToken(token);
        if (invalid ){
            return obj;
        }
        else{
            try {
                const verified = jwt.verify(token, process.env.TOKEN_SECRET);
                obj.username = verified.name;
                obj.role = verified.role;
                obj.connected = true;
                return obj;
            } catch (error) {
                return obj;
            }
        }
    }
}

const invalidateToken = async (token) => {
    let client = await database.getClient();
    let text = "INSERT into invalidTokens(token) VALUES($1)";
    let params = [token];
    try{
        await client.query(text, params);
        return true;
    }catch{
        return false;
    }finally{
        client.release();
    }
}

module.exports = { verifyToken, invalidateToken }