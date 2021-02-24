import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';  
import { LogoutService } from 'src/app/services/logout.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent implements OnInit {

  constructor(private menuController: MenuController, 
    private logoutService: LogoutService) { }

  ngOnInit() {
    this.menuController.swipeGesture(false, 'admin-options');
  }

  showMenu(){
    this.menuController.enable(true, 'admin-options');
    this.menuController.open('admin-options');
  }

  logoutClick(){
    this.closeMenu();
    this.logoutService.endSession();
  }

  closeMenu(){
    this.menuController.close('admin-options');
  }
}
