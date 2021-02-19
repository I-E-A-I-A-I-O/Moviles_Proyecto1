import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertMessageComponent } from '../components/alert-message/alert-message.component';
import { ToastComponent } from '../components/toast/toast.component';
import { PassMenuDataService } from '../services/pass-menu-data.service';

@Component({
  selector: 'app-menu-creation',
  templateUrl: './menu-creation.page.html',
  styleUrls: ['./menu-creation.page.scss'],
})
export class MenuCreationPage implements OnInit {

  private menuData_subscription: Subscription;
  private menuData = [];

  constructor(private alert: AlertMessageComponent, private dataService: PassMenuDataService,
    private toast: ToastComponent) { 
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
        let obj = {type: menuData.type, name:menuData.name, childs:[]};
        this.placeInTree(this.menuData, menuData, obj);
        console.log(this.menuData);
        break;
      }
      default:{ break; }
    }
  }

  ngOnInit() {
  }

  placeInTree(tree, element, obj){
    for (let i = 0; i < tree.length; i++){
      if (tree[i] == element.parent){
        tree[i].childs.push(obj);
        break;
      }
      else if (tree[i].childs.length > 0){
        this.placeInTree(tree[i].childs, element, obj);
      }
    }
  }

  fabOptionSelected(event){
    switch(event){
      case "Create menu":{ 
        this.alert.presentMenuCreation();
        break;
      }
      case "Create submenu":{
        if (this.menuData.length > 0){
          this.alert.presentChildMenuCreation(this.menuData);
        }
        else{
          this.toast.presentToast("Can't create sub menus without menus");
        }
        break;
      }
      case "Add option":{
        break;
      }
      case "Delete element":{
        break;
      }
      default:{ break; }
    }
  }
}
