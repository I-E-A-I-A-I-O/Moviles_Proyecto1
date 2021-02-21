const database = require("../helpers/databaseController");

const getOptions = async (req, res) => {
    let text = "SELECT * FROM options";
    let params = [];
    let client = await database.getClient();
    let results;
    try{
        results = await client.query(text, params);
        res.status(200).json(results.rows);
    }catch{
        res.status(500).json({title:"Error", content:"Database query error"});
    }
    finally{
        await client.release();
    }
}

module.exports = {
    getOptions
}