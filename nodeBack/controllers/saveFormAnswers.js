const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");
const { generateValues } = require("../controllers/setMenuData")

const saveAnswers = async (req, res) => {
  let formId = req.params.id;
  let token = req.headers.authtoken;
  let verfied = await tokenVerifier.verifyToken(token);
  let answers = req.body;
  if (verfied.connected){
    let client = await database.getClient();
    let viewId = await insertFormView(formId, verfied.id, client, answers.length);
    await insertFieldAnswers(answers, viewId, client);
    res.status(200).json({ title: "Success", content: "Answers submitted" });
    client.release();
  }
  else{
    res.status(403).json({ title: "Error", content: "Login first" });
  }
}

insertFormView = async (formId, userId, client, answerCount) => {
  let query = "SELECT COUNT(form_field_id) FROM form_fields WHERE form_id = $1";
  let params = [formId];
  let results = await client.query(query, params);
  let questionCount = results.rows[0].count;
  let completed = (questionCount - answerCount) == 0;
  query = "INSERT INTO form_views(user_id, form_id, answers, completed, view_date) VALUES($1, $2, $3, $4, NOW()) RETURNING view_id";
  params = [userId, formId, answerCount, completed];
  results = await client.query(query, params);
  return results.rows[0].view_id;
}

insertFieldAnswers = async (answers, viewId, client) => {
  let values = generateValues(3, answers.length);
  let params = generateParams(answers, viewId);
  let query = "INSERT INTO user_answers(view_id, form_field_id, user_answer) VALUES" + values;
  await client.query(query, params);
}

generateParams = (objectArray, viewId) => {
    let params = [];
    objectArray.forEach(field => {
      params.push(viewId, field.id, field.answer);
    });
    return params;
}

module.exports = {
  saveAnswers
}
