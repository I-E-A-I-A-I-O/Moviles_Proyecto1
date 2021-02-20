import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { Subscription } from 'rxjs';
import { PassMenuDataService } from 'src/app/services/pass-menu-data.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {

  constructor(private alertController: AlertController, private dataService: PassMenuDataService) {}

  ngOnInit() {}

  async presentAlert(title, message){
    const alert = await this.alertController.create({
      animated: true,
      translucent: true,
      message: message,
      buttons: ['Ok'],
      header: title
    })
    await alert.present();
  }

  async presentMenuCreation(){
    const alert = await this.alertController.create({
      animated: true,
      translucent: true,
      header: "Create a menu",
      inputs:[
        {
          type:"text",
          value: "Menu name",
          name:"menuName",
          id:"menuName"
        }
      ],
      buttons:[
        {
          role:"cancel",
          text:"Cancel"
        },
        {
          text:"Ok",
          handler: (input) => {
            let obj = {
              type: "Menu",
              name: input.menuName,
              childs: []
            }
            this.emitMenu(obj);
          }
        }
      ]
    })
    await alert.present();
  }

  async presentMenuList(parents, redirect, menuOptions = []){
    const alert = await this.alertController.create({
      header: "Select a parent menu",
      inputs: this.createInputs(parents),
      animated:true,
      translucent:true,
      buttons: [
        {
          role:"cancel",
          text:"Cancel"
        },
        {
          text:"Ok",
          handler: (input) => {
            switch(redirect){
              case "Sub menu creation":{
                this.subMenuCreation(input);
                break;
              }
              case "Option add":{
                this.optionList(input, menuOptions);
                break;
              }
              case "Element delete":{

                break;
              }
              default:{ break; }
            }
          }
        }
      ]
    })
    await alert.present();
  }

  async subMenuCreation(parent){
    const alert = await this.alertController.create({
      header:"Set menu name",
      animated:true,
      translucent:true,
      inputs:[
        {
          name:"menuName",
          type:"text",
          id:"menuName",
          value: "Menu name"
        }
      ],
      buttons:[
        {
          role:"cancel",
          text:"Cancel"
        },
        {
          text:"Ok",
          handler: (input) => {
            let obj = {type: "Sub menu", name:input.menuName, parent:parent}
            this.emitMenu(obj);
          }
        }
      ]
    })
    await alert.present();
  }

  async optionList(parent, menuOptions){
    const alert = await this.alertController.create({
      animated: true,
      translucent: true,
      inputs: this.createOptionInputs(menuOptions),
      buttons:[
        {
          text:"Cancel",
          role:"cancel"
        },
        {
          text:"Ok",
          handler: (input) => {
            let obj = { id: input.option_id, type: "Option", name: input.name, action: input.action, parent: parent };
            this.emitMenu(obj);
          }
        }
      ]
    })
    return alert.present();
  }

  createOptionInputs(options){
    let inputs = [];
    options.forEach(element => {
      inputs.push({
        label: element.name,
        value: element,
        type: "radio"
      })
    })
    return inputs;
  }

  createInputs(parents){
    let list = this.treeToList(parents);
    let inputs = [];
    list.forEach(element => {
      inputs.push({
        label: element.name,
        value: element,
        type: "radio"
      })
    })
    return inputs;
  }

  treeToList(tree){
    let list = [];
    for(let i = 0; i < tree.length; i++){
      if(tree[i].type){
        list.push(tree[i]);
        if (tree[i].childs.length > 0){
          list = list.concat(this.treeToList(tree[i].childs));
        }
      }
    }
    return list;
  }

  emitMenu(input){
    this.dataService.setMenuData(input);
  }
}