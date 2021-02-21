const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");

const saveMenu = (req, res) => {
    let menuData = req.body;
    let toMenuTable = [], toSubMenuTable = [], toOptionsTable = [];
    menuData.forEach(element => {
        if (element.type){
            toMenuTable.push(element);
            if(element.type == "Sub menu"){
                toSubMenuTable.push(element);
            }
        }
        else{
            toOptionsTable.push(element);
        }
    })
    if (toMenuTable.length > 0){
        insertMenus(toMenuTable);
    }
    if (toSubMenuTable.length > 0){
        //a
    }
    if (toOptionsTable.length > 0){
        //b
    }
    res.status(200).json({hola:"hola"});
}

const insertMenus = (menuArray) => {
    let queryValues = generateValues(2, menuArray.length);
    let text = "INSERT INTO menu(menu_id, label) VALUES " + queryValues;
    let params = generateMenuParams(menuArray, "Menu");
    database.query(text, params, (error))
}

const generateValues = (optionsPerRow, rows) => {
    let values = "";
    let m = 0;
    for(let i = 0; i < rows; i++){
        if (i > 0) { values += "," }
        for (let n = 0; n < optionsPerRow; n++){
            m++;
            if (n == 0) { values += "(" }
            if (n > 0) { values += "," }
            values += "$" + m;
            if (n == (optionsPerRow - 1)) { values += ")" }
        }
    }
    return values;
}

const generateMenuParams = (objectArray, type) => {
    let params = [];
    switch(type){
        case "Menu":{
            objectArray.forEach(menu => {
                params.push(menu.id, menu.name);
            })
            break;
        }
        case "Sub menu":{
            objectArray.forEach(menu => {
                params.push(menu.id, menu.parent_id);
            })
            break;
        }
        case "Option":{
            objectArray.forEach(menu => {
                params.push(menu.parent_id, menu.id);
            })
            break;
        }
        default: { break; }
    }
    return params;
}

module.exports= {
    saveMenu
}