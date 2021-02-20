import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'forms-component',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})

export class FormsComponent implements OnInit {

  public form: FormGroup;
  public id: string = "forms";
  public titulo: string = "+ NEW FIELD";

  constructor(private alertController: AlertController, private formBuilder: FormBuilder) { }

  ngOnInit() {

    
  }

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

  async presentAlertPrompt(namex:string,valuex:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Forms Data',
      inputs: [
        {
          id: 'descripcion',
          name: 'name1',
          type: 'text',
          placeholder: 'Descripcion del formulario'
        },
        {
          name: namex,
          type: 'text',
          id: 'name2-id',
          value: valuex,
          placeholder: 'Placeholder 2'
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
          handler: () => {
            let {value, type, name} = alert.inputs[1];
            this.buildForm(type,value,name);
          }
        }
      ]

    });

  
    await alert.present();
  }
}
