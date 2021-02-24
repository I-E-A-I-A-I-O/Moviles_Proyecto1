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

  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;
  private token: Token;

  constructor(public sessionVerifier: VerifySessionService, private menu: AdminMenuComponent,
    private store: Store) { 
      this.tokenOb =  this.store.select(state => state.token.token);
  }

  ngOnInit() {
    this.tokenSub = this.tokenOb.subscribe((token) => {
      this.token = token;
    })
    this.sessionVerifier.verifySessionActive(this.token);
    this.sessionVerifier.getProfile(this.token);
  }

  ngOnDestroy(){
    this.tokenSub.unsubscribe();
  }

  openMenu(){
    this.menu.showMenu();
  }
}
