const tokenVerifier = require("../helpers/tokenVerifier");
const database = require("../helpers/databaseController");

const { generateValues } = require("../controllers/setMenuData");

const saveForm = async(req, res) => {
    let formData = req.body;
    let token = req.headers.authtoken;
    let verfied = await tokenVerifier.verifyToken(token);
    if (verfied.connected){
        if (verfied.role == "admin"){
            let result = await toFormTable(verfied.id, formData.title);
            if (result.insert){
                await insertFields(result.id, formData.fields);
                res.status(200).json({title: "Success", content: "Form saved"});
                createFormLink(result.id, formData.title);
            }
            else{
                res.status(500).json({title: "Error", content: "Form couldn't be saved"});
            }
        }
        else{
            res.status(403).json({title: "Error", content: "You don't have permission to do that"});
        }
    }
    else{
        res.status(403).json({title: "Error", content: "Login first"});
    }
}

const toFormTable = async (id, title) => {
    let client = await database.getClient();
    let query = "INSERT INTO form(creator_id, form_name, creation_date) VALUES($1, $2, NOW()) RETURNING form_id";
    let params = [id, title];
    try{
        let result = await client.query(query, params);
        return {insert: true, id: result.rows[0].form_id};
    }catch(e){
        console.log(e);
        return {insert: false, id: null};
    }finally{
        client.release();
    }
}

const getInsertParams = (formId, fields) => {
    let params = [];
    fields.forEach(field => {
        params.push(formId, field.id, field.label, field.options);
    })
    return params;
}

const getQueryData = (formId, fields) => {
    let params = getInsertParams(formId, fields);
    let values = generateValues(4, fields.length);
    let query = "INSERT INTO form_fields(form_id, field_id, label, options) VALUES" + values;
    return { query: query, params: params };
}

const insertFields = async (formId, fields) => {
    let queryData = getQueryData(formId, fields);
    let client = await database.getClient();
    try{
        client.query(queryData.query, queryData.params);
    }catch(e){
        console.log(e);
    }finally{
        client.release();
    }
}

const createFormLink = async(formId, formName) => {
    let client = await database.getClient();
    let query = "INSERT INTO options(name, action, form_id) VALUES($1, $2, $3)";
    let params = [`Form: ${formName}`, `forms/form/${formId}`, formId];
    try{
        await client.query(query, params);
    }catch(e){
        console.log(e);
    }finally{
        client.release();
    }
}

module.exports = {
    saveForm
}