const database = require("../helpers/databaseController");

const getStats = async (req, res) => {
  let client = await database.getClient();
  let stats = { viewsNanswers: null, questions: null, prom: null };
  let query = "SELECT fv.form_id, f.form_name, COUNT(view_id), SUM(answers) FROM form_views fv INNER JOIN form f ON f.form_id = fv.form_id GROUP BY fv.form_id, f.form_name";
  stats.viewsNanswers = await getViews(client, query);
  query = "SELECT ff.form_id, f.form_name, COUNT(ff.form_field_id) FROM form_fields ff INNER JOIN form f ON f.form_id = ff.form_id GROUP BY ff.form_id, f.form_name";
  stats.questions = await getQuery(client, query);
  client.release();
  stats.prom = getProm(stats.viewsNanswers);
  res.status(200).json({title: "Success", content: stats});
}

getQuery = async(client, query) => {
  try{
    let results = await client.query(query, []);
    return results.rows;
  }catch(e){
    console.log(e);
    return null;
  }
}

getProm = (stats) => {
  let proms = [];
  let prom;
  for (int i = 0; i < stats.length; i++){
    prom = stats[i].sum / stats[i].count;
    proms.push({form_id: stats[i].form_id, form_name: stats[i].form_name, prom: prom});
  }
  return proms;
}

module.exports = {
  getStats
}
