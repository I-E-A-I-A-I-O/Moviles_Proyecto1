import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular'
import { PassMenuDataService } from 'src/app/services/pass-menu-data.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {

  constructor(private alertController: AlertController, private dataService: PassMenuDataService) { }

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

  async presentChildMenuCreation(parents){
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
            this.childMenuCreationPart2(input);
          }
        }
      ]
    })
    await alert.present();
  }

  async childMenuCreationPart2(parent){
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
      list.push(tree[i]);
      if (tree[i].childs.length > 0){
        list = list.concat(this.treeToList(tree[i].childs));
      }
    }
    return list;
  }

  emitMenu(input){
    this.dataService.setMenuData(input);
  }
}