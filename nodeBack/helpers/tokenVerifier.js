const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    let obj = {
        username: "",
        role: "",
        connected: false
    }
    if (!token){
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

module.exports = { verifyToken }