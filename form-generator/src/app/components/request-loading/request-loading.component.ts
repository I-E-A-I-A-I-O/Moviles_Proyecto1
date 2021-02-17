import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-request-loading',
  templateUrl: './request-loading.component.html',
  styleUrls: ['./request-loading.component.scss'],
})
export class RequestLoadingComponent implements OnInit {

  constructor(public loadingController: LoadingController) { }

  ngOnInit() {}

  async presentLoading(){
    const loading = await this.loadingController.create({
      message:"Creating account...",
      animated: true,
      translucent: true,
      duration:40000,
      spinner: "bubbles",
      id: "loadingComponent"
    })
    await loading.present();
  }
}
