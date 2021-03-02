import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Token } from '../store/token/token.model';
import { RegularMenuComponent } from '../components/regular-menu/regular-menu.component';
import { VerifySessionService } from '../services/verify-session.service';
import { Store } from '@ngxs/store';
import { UserStatsDisplayComponent } from '../components/user-stats-display/user-stats-display.component';

@Component({
  selector: 'app-regular-page',
  templateUrl: './regular-page.page.html',
  styleUrls: ['./regular-page.page.scss'],
})
export class RegularPagePage implements OnInit {

  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;
  private token;

  constructor(private menu: RegularMenuComponent, private verify: VerifySessionService,
  private store: Store, private stats: UserStatsDisplayComponent) {
    this.tokenOb = this.store.select(state => state.token.token);
  }

  ngOnInit() {
    this.tokenSub = this.tokenOb.subscribe(token => {
      this.token = token;
    })
  }

  ngOnDestroy() {
    this.tokenSub.unsubscribe();
  }

  ionViewWillEnter(){
    this.verify.verifySessionActive(this.token);
    this.menu.requestMenu();
    this.stats.getStats();
  }

  openMenu(){
    this.menu.openMenu();
  }
}
