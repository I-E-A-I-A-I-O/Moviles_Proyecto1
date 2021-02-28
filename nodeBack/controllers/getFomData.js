const database = require("../helpers/databaseController");

const getFieldOptions = async(req, res) => {
  let client = await database.getClient();
  let query = "SELECT * FROM fields";
  try{
    let fields = await client.query(query, []);
    res.status(200).json({title: "Success", content: fields.rows});
  }catch(e){
    console.log(e);
    res.status(500).json({title: "Error", content: "Error retrieving data"});
  }finally{
    await client.release();
  }
}

module.exports = {
  getFieldOptions
}
