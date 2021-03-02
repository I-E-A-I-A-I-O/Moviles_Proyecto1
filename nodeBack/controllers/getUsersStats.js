const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");

usersStats = async (req, res) => {
  let client = await database.getClient();
  let stats = { views_answers: null, completed_forms: null };
  let query = "SELECT fv.user_id, u.username, COUNT(fv.form_id) AS visited_forms_count, SUM(fv.answers) AS total_answers_sum FROM form_views fv INNER JOIN users u ON u.user_id = fv.user_id GROUP BY fv.user_id, u.username";
  try{
    let results = await client.query(query, []);
    stats.views_answers = results.rows;
    query = "SELECT fv.user_id, u.username, COUNT(fv.completed) AS completed_forms_count FROM form_views fv INNER JOIN users u ON u.user_id = fv.user_id WHERE fv.completed = true GROUP BY fv.user_id, u.username";
    results = await client.query(query, []);
    stats.completed_forms = results.rows;
    res.status(200).json({ title: "Success", content: stats });
  }catch(e){
    console.log(e);
    res.status(500).json({ title: "Error", content: "Error retrieving stats..." });
  }finally{
    client.release();
  }
}

userStats = async (req, res) => {
  let token = req.headers.authtoken;
  let verified = await tokenVerifier.verifyToken(token);
  if (verified.connected){
    let client = await database.getClient();
    let stats = { views_answers: null, completed_forms: null };
    let query = "SELECT fv.user_id, u.username, COUNT(fv.form_id) AS visited_forms_count, SUM(fv.answers) AS total_answers_sum FROM form_views fv INNER JOIN users u ON u.user_id = fv.user_id WHERE fv.user_id = $1 GROUP BY fv.user_id, u.username";
    try{
      let results = await client.query(query, [verified.id]);
      stats.views_answers = results.rows;
      query = "SELECT fv.user_id, u.username, COUNT(fv.completed) AS completed_forms_count FROM form_views fv INNER JOIN users u ON u.user_id = fv.user_id WHERE fv.completed = true AND fv.user_id = $1 GROUP BY fv.user_id, u.username";
      results = await client.query(query, [verified.id]);
      stats.completed_forms = results.rows;
      res.status(200).json({ title: "Success", content: stats });
    }catch(e){
      console.log(e);
      res.status(500).json({ title: "Error", content: "Error retrieving stats..." });
    }finally{
      client.release();
    }
  }
  else{
    res.status(403).json({ title: "Error", content: "Login first" });
  }
}

module.exports = {
  usersStats,
  userStats
}
