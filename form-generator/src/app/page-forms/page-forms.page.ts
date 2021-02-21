import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertMessageComponent } from '../components/alert-message/alert-message.component';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'page-forms',
  templateUrl: './page-forms.page.html',
  styleUrls: ['./page-forms.page.scss'],
})

export class PageFormsPage implements OnInit {

  public form: FormGroup;
  public id: string = "form";
  private array = [];
  private obj:object = {};

  constructor(private alertController: AlertController,private alert: AlertMessageComponent ,private formBuilder: FormBuilder) { }

  ngOnInit() {}

  buildForm(type:string,value:string, name:string) {

    const xid = document.getElementById(this.id);

    const parrafo = document.createElement("label"); 
    const texto1 = document.createTextNode(name);
    parrafo.appendChild(texto1);
    xid.appendChild(parrafo);
      
    const y = document.createElement("input");
    y.setAttribute("type", type);
    y.setAttribute("value", value);
    y.style.width ="90%";
    xid.appendChild(y);
  }

  async insertData() {
  
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Forms Data',
      inputs:[
        {
          name: 'namefield',
          type: 'text',
          placeholder: 'name of field'
        },
        {
          name: 'type',
          type: 'text',
          placeholder: 'Type of field '
        },
         {
          name: 'contentfield',
          type: 'text',
          placeholder: 'field content'
        }
      ],  
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Create',
          handler: data => {          
            if(data.ID === "" || data.type === "" || data.namefield === "" || data.contentfield === "") return;
            
            this.buildForm(data.type, data.contentfield, data.namefield);
            let obj = {type: data.type, name: data.namefield, content: data.contentfield};         
            this.placeInTree(obj);          
            
          }
        }
      ]
    });
    await alert.present();
  }


  placeInTree(a){
    this.array.push(a);
  }

  createForm(){
    this.insertData()   
  }

  async modifyData() {
  
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Field',
      inputs:[
        {
          name: 'name',
          type: 'text',
          placeholder: 'choose the name of the field to delete'
        }
      ],  
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          handler: data => {          
            if(data.name === "") return;       
            
            this.array.forEach( (item) => {
              if(item.name === data.name)
                console.log("los datos son iguales");
                return;
                 
                console.log("los datos no son iguales");
            });
          }
        }
      ]
    });
    await alert.present();
  }

  deleteDataForm(){
    this.modifyData();
  }
 
}
