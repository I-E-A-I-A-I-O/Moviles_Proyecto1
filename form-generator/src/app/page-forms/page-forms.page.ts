import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-forms',
  templateUrl: './page-forms.page.html',
  styleUrls: ['./page-forms.page.scss'],
})

export class PageFormsPage implements OnInit {

  public form: FormGroup;
  public id: string = "forms";

  constructor(private alertController: AlertController, private formBuilder: FormBuilder) { }

  ngOnInit() {}

  buildForm(type:string, value:string, name:string) {

    const xid = document.getElementById(this.id);

    const x = document.createElement("FORM");
    x.setAttribute("id", this.id);
    document.body.appendChild(x);

    const parrafo = document.createElement("h3"); 
    const texto1 = document.createTextNode(name);
    parrafo.appendChild(texto1);
    xid.appendChild(parrafo);
  
    const y = document.createElement("INPUT");
    y.setAttribute("type", type);
    y.setAttribute("value", value);
    xid.appendChild(y);
  }

  async presentAlertPrompt() {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Forms Data',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Tipo de dato'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Valor Del dato'
        },
        // multiline input.
        {
          name: 'name3',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'titulo del campo'
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
          text: 'Ok',
          handler: data => {
            this.buildForm(data.name1, data.name2, data.name3);
          }
        }
      ]

    });
    await alert.present();
  }

  optionSelected(event){
    switch(event){
      case "Create Forms":{ 
       this.presentAlertPrompt();
        break;
      }
      case "":{
        this.presentAlertPrompt();
        break;
      }
      case "Add option":{
        this.presentAlertPrompt();
        break;
      }
      case "Delete element":{
        break;
      }
      default:{ break; }
    }
  }
 
}
