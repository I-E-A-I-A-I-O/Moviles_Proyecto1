const database = require("../helpers/databaseController");

const getOptions = (req, res) => {
    let text = "SELECT * FROM options";
    let params = [];
    database.query(text, params, (err, results) => {
        if (err){
            res.status(503).json({title:"Error", content:err.message});
        }
        else{
            res.status(200).json(results.rows);
        }
    })
}

module.exports = {
    getOptions
}