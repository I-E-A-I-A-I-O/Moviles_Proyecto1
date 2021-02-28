const db = require('../helpers/databaseController');
const { createForm, createFormOptions} = require('../helpers/formArrange')

const getViewForm = async (req, res) => {
    let client = await database.getClient();
    try{
        let formArray = await client.query("SELECT * FROM form");
        if (formArray.rows.length < 1){
            res.status(200).json({title:"Success", description:"No form saved", content:[]});
        }
        else{
            let arrayF = await client.query("SELECT * FROM form_fields INNER JOIN form ON form_fields.form_fields_id = form.form_id");
            let formOptions = await client.query("SELECT * FROM form_views INNER JOIN options ON form_views.view_id = options.option_id");
            let form = createForm(formArray.rows, arrayF.rows);
            createFormOptions(formOptions.rows, form);
            res.status(200).json({title:"Success", description:"form obtained", content:form});
        }
    }catch(e){
        res.status(500).json({title:"Error", description:e.stack, content:[]})
    }finally{
        await client.release();
    }
}


module.exports ={
    getViewForm
}