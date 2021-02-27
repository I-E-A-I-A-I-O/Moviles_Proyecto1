import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.component.html',
  styleUrls: ['./popover-component.component.scss'],
})
export class PopoverComponentComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  dismiss(data){
    this.popoverController.dismiss(data, "", "popover");
  }
}
