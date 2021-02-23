const database = require("../helpers/databaseController");
const { createMenu, createSubMenu, createOptions } = require("../helpers/menuArrange")

const getOptions = async (req, res) => {
    let text = "SELECT * FROM options";
    let params = [];
    let client = await database.getClient();
    let results;
    try{
        results = await client.query(text, params);
        res.status(200).json(results.rows);
    }catch(e){
        res.status(500).json({title:"Error", content:e.message});
    }
    finally{
        await client.release();
    }
}

const getMenu = async (req, res) => {
    let client = await database.getClient();
    try{
        let menuArray = await client.query("SELECT * FROM menu");
        if (menuArray.rows.length < 1){
            res.status(200).json({title:"Success", description:"No menu saved", content:[]});
        }
        else{
            let subMenuArray = await client.query("SELECT * FROM sub_menu INNER JOIN menu ON menu.menu_id = sub_menu.menu_id");
            let menuOptionArray = await client.query("SELECT * FROM menu_options INNER JOIN options ON menu_options.option_id = options.option_id");
            let menu = createMenu(menuArray.rows, subMenuArray.rows);
            createSubMenu(subMenuArray.rows, menu);
            createOptions(menuOptionArray.rows, menu);
            res.status(200).json({title:"Success", description:"Menu retrieved", content:menu});
        }
    }catch(e){
        res.status(500).json({title:"Error", description:e.stack, content:[]})
    }finally{
        await client.release();
    }
}

module.exports = {
    getOptions,
    getMenu
}