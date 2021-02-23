const database = require("../helpers/databaseController");
const tokenVerifier = require("../helpers/tokenVerifier");

const saveMenu = async (req, res) => {
    let menuData = req.body;
    let toMenuTable = [], toSubMenuTable = [], toOptionsTable = [];
    let token = req.headers.authtoken;
    let result = await tokenVerifier.verifyToken(token);
    if (result.connected){
        if (result.role != "admin"){
            res.status(403).json({title:"Error", content:"Account role invalid"});
        }
        else{
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
            let client = await database.getClient();
            try{
                await client.query("DELETE FROM menu", []);
                await client.query("DELETE FROM sub_menu", []);
                await client.query("DELETE FROM menu_options", []);
                if (toMenuTable.length > 0){
                    let data = insertMenus(toMenuTable, "Menu");
                    await client.query(data.query, data.params);
                }
                if (toSubMenuTable.length > 0){
                    let data = insertMenus(toSubMenuTable, "Sub menu");
                    await client.query(data.query, data.params);
                }
                if (toOptionsTable.length > 0){
                    let data = insertMenus(toOptionsTable, "Option");
                    await client.query(data.query, data.params);
                }
                res.status(200).json({title: "Success", content: "Changes saved"});
            }catch(e){
                console.log(e);
                res.status(500).json({title:"Error", content:"Error saving changes"});
            }finally{
                await client.release();
            }
        }
    }
    else{
        res.status(403).json({title:"Error", content:"Login first"});
    }
}

const insertMenus = (menuArray, type) => {
    let queryValues = generateValues(2, menuArray.length);
    let text;
    let params = generateMenuParams(menuArray, type);
    switch(type){
        case "Menu":{
            text = "INSERT INTO menu(menu_id, label) VALUES" + queryValues;
            break;
        }
        case "Sub menu":{
            text = "INSERT INTO sub_menu(parent_menu_id, menu_id) VALUES" + queryValues;
            break;
        }
        case "Option":{
            text = "INSERT INTO menu_options(parent_menu_id, option_id) VALUES" + queryValues;
            break;
        }
        default: { break; }
    }
    return { query: text, params: params }
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
                params.push(menu.parent_id, menu.id);
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