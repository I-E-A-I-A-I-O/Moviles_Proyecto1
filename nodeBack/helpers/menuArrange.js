const createMenu = (menuArr, subMenuArr) => {
    let menus = []
    menuArr.forEach(menu => {
        if (subMenuArr.length > 0){
            let flag = false;
            subMenuArr.forEach(submenu => {
                if (menu.menu_id == submenu.menu_id){ flag = true }
            })
            if (!flag) { menus.push({type:"Menu", name:menu.label, childs:[], id:menu.menu_id, hidden: false}); }
        }
        else{
            menus.push({type:"Menu", name:menu.label, childs:[], id:menu.menu_id, hidden:false});
        }
    })
    return menus;
}

const createSubMenu = (subMenuArr, menuTree) => {
    subMenuArr.forEach(subMenuObj => {
        placeSubMenuInTree(subMenuObj, menuTree);
    })
}

const placeSubMenuInTree = (subMenuObj, menuTree) => {
    menuTree.forEach(menuNode => {
        if (menuNode.type){
            if (menuNode.id == subMenuObj.parent_menu_id){
                menuNode.childs.push({id: subMenuObj.menu_id, type:"Sub menu", name:subMenuObj.label, childs:[], parent_id: menuNode.id, hidden: true});
                return;
            }
            else if (menuNode.childs.length > 0){
                placeSubMenuInTree(subMenuObj, menuNode.childs);
            }
        }
    })
}

const createOptions = (menuOptionsArr, menuTree) => {
    menuOptionsArr.forEach(menuOptionObj => {
        placeMenuOptionInTree(menuOptionObj, menuTree);
    })
}

const placeMenuOptionInTree = (menuOptionObj, menuTree) => {
    menuTree.forEach(menuNode => {
        if (menuNode.type){
            if (menuNode.id == menuOptionObj.parent_menu_id){
                menuNode.childs.push({id:menuOptionObj.option_id, name:menuOptionObj.name, action:menuOptionObj.action, parent_id:menuOptionObj.parent_menu_id, hidden: true});
                return;
            }
            else if (menuNode.childs.length > 0){
                placeMenuOptionInTree(menuOptionObj, menuNode.childs);
            }
        }
    })
}

module.exports = {
    createMenu,
    createSubMenu,
    createOptions
}