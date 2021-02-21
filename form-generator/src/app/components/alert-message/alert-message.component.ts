import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { MenuCreationFunctionsService } from 'src/app/services/menu-creation-functions.service';
import { PassMenuDataService } from 'src/app/services/pass-menu-data.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {

  constructor(private alertController: AlertController, 
    private dataService: PassMenuDataService,
    private menuFunctions: MenuCreationFunctionsService) {}

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

  async presentMenuCreation(currentMenuData = []){
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
              childs: [],
              id: this.menuFunctions.generateId(currentMenuData)
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
      inputs: this.menuFunctions.createInputs(parents),
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
                this.subMenuCreation(input, this.menuFunctions.generateId(parents));
                break;
              }
              case "Option add":{
                this.optionList(input, menuOptions, this.menuFunctions.generateId(parents));
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

  async subMenuCreation(parent, id){
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
            let obj = {
              type: "Sub menu",
              name: input.menuName,
              parent: parent,
              id: id
            }
            this.emitMenu(obj);
          }
        }
      ]
    })
    await alert.present();
  }

  async optionList(parent, menuOptions, id){
    const alert = await this.alertController.create({
      animated: true,
      translucent: true,
      inputs: this.menuFunctions.createOptionInputs(menuOptions),
      buttons:[
        {
          text:"Cancel",
          role:"cancel"
        },
        {
          text:"Ok",
          handler: (input) => {
            let obj = { 
              id: input.option_id, 
              type: "Option", 
              name: input.name,
              action: input.action, 
              parent: parent,
              parent_id: parent.id,
              tree_id: id
            };
            this.emitMenu(obj);
          }
        }
      ]
    })
    return alert.present();
  }

  async deleteList(currentTree){
    const alert = await this.alertController.create({
      animated: true,
      translucent: true,
      inputs: this.menuFunctions.createDeleteInputs(currentTree),
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Ok",
          handler: (input) => {
            let obj = { type: "Delete", input: input }
            this.emitMenu(obj);
          }
        }
      ]
    })
    return alert.present();
  }

  emitMenu(input){
    this.dataService.setMenuData(input);
  }
}