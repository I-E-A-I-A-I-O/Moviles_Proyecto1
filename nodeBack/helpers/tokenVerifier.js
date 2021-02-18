const database = require("./databaseController");
const jwt = require("jsonwebtoken");

const invalidToken = async (token) => {
    let text = "SELECT token FROM invalidTokens WHERE token = $1";
    let params = [token];
    let data = await database.queryAsync(text, params);
    return data.rowCount > 0;
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

module.exports = { verifyToken }