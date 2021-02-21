import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertMessageComponent } from '../components/alert-message/alert-message.component';
import { ToastComponent } from '../components/toast/toast.component';
import { MenuCreationFunctionsService } from '../services/menu-creation-functions.service';
import { PassMenuDataService } from '../services/pass-menu-data.service';
import { VariousRequestsService } from '../services/various-requests.service';

@Component({
  selector: 'app-menu-creation',
  templateUrl: './menu-creation.page.html',
  styleUrls: ['./menu-creation.page.scss'],
})
export class MenuCreationPage implements OnInit {

  private menuData_subscription: Subscription;
  private menuData = [];
  private menuOptions = [];

  constructor(private alert: AlertMessageComponent, private dataService: PassMenuDataService,
    private toast: ToastComponent, private requests: VariousRequestsService,
    private menuFunctions: MenuCreationFunctionsService) { 
    this.menuData_subscription = dataService.execChange.subscribe((menuData) => {
      this.arrange(menuData);
    })
  }

  arrange(menuData){
    switch(menuData.type){
      case "Menu":{
        this.menuData.push(menuData);
        break;
      }
      case "Sub menu":{
        let obj = { id:menuData.id, type: menuData.type, name:menuData.name, childs:[], parent_id: menuData.parent.id };
        this.placeInTree(this.menuData, menuData, obj);
        break;
      }
      case "Option":{
        let obj = { id: menuData.id, name: menuData.name, action: menuData.action, parent_id: menuData.parent_id, tree_id: menuData.tree_id };
        this.placeInTree(this.menuData, menuData, obj);
        break;
      }
      case "Delete":{
        this.deleteFromTree(this.menuData, menuData.input);
        break;
      }
      default:{ break; }
    }
  }

  ngOnInit() {
    this.requests.requestMenuOptions().then(jsonArr => {
      this.menuOptions = jsonArr;
    })
  }

  ngOnDestroy(){
    this.menuData_subscription.unsubscribe();
  }

  deleteFromTree(tree, input){
    for (let i = 0; i < tree.length; i++){
      if (tree[i] == input){
        tree.pop(tree[i]);
        break;
      }
      else if (tree[i].type && tree[i].childs.length > 0){
        this.deleteFromTree(tree[i].childs, input);
      }
    }
  }

  placeInTree(tree, element, obj){
    for (let i = 0; i < tree.length; i++){
      if (tree[i] == element.parent){
        tree[i].childs.push(obj);
        break;
      }
      else if (tree[i].type && tree[i].childs.length > 0){
        this.placeInTree(tree[i].childs, element, obj);
      }
    }
  }

  fabOptionSelected(event){
    switch(event){
      case "Create menu":{ 
        this.alert.presentMenuCreation(this.menuData);
        break;
      }
      case "Create submenu":{
        if (this.menuData.length > 0){
          this.alert.presentMenuList(this.menuData, "Sub menu creation");
        }
        else{
          this.toast.presentToast("Can't create sub menus without menus");
        }
        break;
      }
      case "Add option":{
        if (this.menuData.length > 0){
          this.alert.presentMenuList(this.menuData, "Option add", this.menuOptions);
        }
        else{
          this.toast.presentToast("Can't add options without menus");
        }
        break;
      }
      case "Delete element":{
        if (this.menuData.length > 0){
          this.alert.deleteList(this.menuData);
        }
        else{
          this.toast.presentToast("There is nothing to delete");
        }
        break;
      }
      case "Save menu":{
        if (this.menuData.length > 0){
          this.requests.saveMenu(this.menuData);
        }
        else{
          this.toast.presentToast("Nothing to save here");
        }
        break;
      }
      default:{ break; }
    }
  }
}
