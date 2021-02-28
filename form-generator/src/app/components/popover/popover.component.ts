import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentComponent } from '../popover-component/popover-component.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  async presentPopOver(){
    const popover = await this.popoverController.create({
      component: PopoverComponentComponent,
      animated: true,
      translucent: true,
      id: "popover"
    })
    await popover.present();
    let result = await popover.onDidDismiss();
    return result.data;
  }
}
