const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");
const multiparty = require("multiparty");
const bcrypt = require("bcrypt");

const editAccount = async(req, res) => {
    res.status(200).json({title:"Nada", content:"Nothing to see here."});
}

module.exports = {
    editAccount
}