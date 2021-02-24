import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LogoutService } from 'src/app/services/logout.service';
import { VariousRequestsService } from 'src/app/services/various-requests.service';

@Component({
  selector: 'app-regular-menu',
  templateUrl: './regular-menu.component.html',
  styleUrls: ['./regular-menu.component.scss'],
})
export class RegularMenuComponent implements OnInit {

  private menuData = [];

  constructor(private menuController: MenuController, private logoutService: LogoutService, 
    private menuRequests: VariousRequestsService) { }

  ngOnInit() {
    this.menuController.swipeGesture(false, "regular-options");
    this.menuRequests.getMenu(false).then(menuData => {
      this.menuData = menuData.content;
      console.log(this.menuData);
    })
  }

  openMenu(){
    this.menuController.enable(true, "regular-options");
    this.menuController.open("regular-options");
  }

  closeMenu(){
    this.menuController.close("regular-options");
  }

  logout(){
    this.closeMenu();
    this.logoutService.endSession();
  }
}
