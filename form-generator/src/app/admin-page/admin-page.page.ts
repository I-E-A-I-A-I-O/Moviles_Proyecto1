import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../components/admin-menu/admin-menu.component';
import { VerifySessionService } from '../services/verify-session.service';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Token } from '../store/token/token.model';
import { User } from '../store/user/user.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {

  private username: any;
  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;
  private token: Token;
  private usernameOb: Observable<User>;
  private usernameSub: Subscription;

  constructor(public sessionVerifier: VerifySessionService, private menu: AdminMenuComponent,
    private store: Store) { 
      this.tokenOb =  this.store.select(state => state.token.token);
      this.usernameOb = this.store.select(state => state.user.user.username);
  }

  ngOnInit() {
    this.tokenSub = this.tokenOb.subscribe((token) => {
      this.token = token;
    })
    this.usernameSub = this.usernameOb.subscribe((username) => {
      this.username = username;
    })
    this.sessionVerifier.verifySessionActive(this.token);
    this.sessionVerifier.getProfile(this.token);
  }

  ngOnDestroy(){
    this.tokenSub.unsubscribe();
    this.usernameSub.unsubscribe();
  }

  openMenu(){
    this.menu.showMenu();
  }
}
