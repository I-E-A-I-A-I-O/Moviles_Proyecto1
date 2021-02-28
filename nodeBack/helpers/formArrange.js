const createForm = (formArr, formArray) => {
    let arrayForm = []
    formArr.forEach(form => {
        if (formArray.length > 0){
            let point = false;
            formArray.forEach(form_fields => {
                if (form.form_id == form_fields.form_id){ point = true }
            })
            if (!point) { arrayForm.push({type:"Form", name:form.label, childs:[], id:form.form_id, hidden: false}); }
        }
        else{
            arrayForm.push({type:"Form", name:form.label, childs:[], id:form.form_id, hidden:false});
        }
    })
    return arrayForm;
}

const createFormOptions = (formOptions, formTree) => {
    formOptions.forEach(formOptionObj => {
        placeFormOptionInTree(formOptionObj, formTree);
    })
}

const placeFormOptionInTree = (formOptionObj, formTree) => {
    formTree.forEach(form => {
        if (form.type){
            if (form.id == formOptionObj.option_id){
                form.childs.push({id:formOptionObj.option_id, name:formOptionObj.name, action:formOptionObj.action, hidden: true});
                return;
            }
            else if (form.childs.length > 0){
                placeFormOptionInTree(formOptionObj, form.childs);
            }
        }
    })
}

module.exports = {
    createForm,
    createFormOptions
}