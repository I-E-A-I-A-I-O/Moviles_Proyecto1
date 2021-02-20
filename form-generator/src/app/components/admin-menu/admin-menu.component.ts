import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';  

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
    this.menuController.swipeGesture(false, 'admin-options');
  }

  showMenu(){
    this.menuController.enable(true, 'admin-options');
    this.menuController.open('admin-options');
  }
}
