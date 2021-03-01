const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");

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

getForm = async (req, res) => {
  let formId = req.params.id;
  let token = req.headers.authtoken;
  let verfied = await tokenVerifier.verifyToken(token);
  if (verfied.connected){
    let client = await database.getClient();
    let result = await firstTime(formId, verfied.id, client);
    let data = { firstTime: result.bool, formData: [], userAnswers: [] };
    data.formData = await formData(formId, client);
    if (!result.bool) { data.userAnswers = await userAnswers(result.id, client); }
    res.status(200).json({ title: "Success", content: data });
    client.release();
  }
  else{
    res.status(403).json({ title: "Error", content: "Login first" });
  }
}

firstTime = async (formId, userId, client) => {
  let query = "SELECT * FROM form_views WHERE form_id = $1 AND user_id = $2";
  let params = [formId, userId];
  let results = await client.query(query, params);
  if (results.rowCount > 0){
    return { id: results.rows[0].view_id, bool: false };
  }
  else{
    return { id: null, bool: true };
  }
}

formData = async (formId, client) => {
  let query = "SELECT * FROM form f INNER JOIN form_fields ff ON ff.form_id = f.form_id INNER JOIN fields fd ON fd.field_id = ff.field_id WHERE f.form_id = $1";
  let params = [formId];
  let results = await client.query(query, params);
  let rows = results.rows;
  return rows;
}

userAnswers = async (viewId, client) => {
  let query = "SELECT * FROM user_answers WHERE view_id = $1";
  let params = [viewId];
  let results = await client.query(query, params);
  return results.rows;
}

module.exports = {
  getFieldOptions,
  getForm
}
