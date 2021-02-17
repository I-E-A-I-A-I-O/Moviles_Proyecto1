import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {

  constructor(public alertController: AlertController) { }

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
}
