import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  async presentToast(message){
    const toast = await this.toastController.create({
      animated: true,
      translucent:true,
      position:"bottom",
      message:message,
      duration:1500
    })
    toast.present();
  }
}
