import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../components/admin-menu/admin-menu.component';
import { VerifySessionService } from '../services/verify-session.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {

  private username: string;
  private avatarSrc: string;

  constructor(private sessionVerifier: VerifySessionService, private menu: AdminMenuComponent) { }

  ngOnInit() {
    this.sessionVerifier.verifySessionActive();
    this.sessionVerifier.getProfile().then(json => {
      this.username = json.username;
    });
  }

  openMenu(){
    this.menu.showMenu();
  }
}
