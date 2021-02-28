const database = require("../helpers/databaseController");

const usersStats = async (req, res) => {
  let client = await database.getClient();
  let stats = { viewsNanswers: null };
  let query = "SELECT fv.user_id, u.username, COUNT(fv.form_id), SUM(fv.answers) FROM form_views fv INNER JOIN users u ON u.user_id = fv.user_id GROUP BY fv.user_id, u.username";
  try{
    let results = await client.query(query, []);
    stats.viewsNanswers = results.rows;
    res.status(200).json({title: "Success", content: stats});
  }catch(e){
    console.log(e);
    res.status(500).json(title: "Error", content: "Error retrieving stats...");
  }finally{
    client.release();
  }
}

exports.module = {
  usersStats
}
