import { Component, OnInit } from '@angular/core';
import { VerifySessionService } from 'src/app/services/verify-session.service';
import { Store } from '@ngxs/store'
import { Observable, Subscription } from 'rxjs';
import { Token } from 'src/app/store/token/token.model';
import { User } from 'src/app/store/user/user.model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {

  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;
  private token: Token;
  private avatar: any;
  private userDataOb: Observable<User>
  private userDataSub: Subscription;

  constructor(private verifySessionService: VerifySessionService, private store: Store) { 
    this.tokenOb = this.store.select(state => state.token.token);
    this.userDataOb = this.store.select(state => state.user.user.avatar);
  }

  ngOnDestroy(){
    this.tokenSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }

  ngOnInit() {
    this.tokenSub = this.tokenOb.subscribe((token) => {
      this.token = token;
    })
    this.userDataSub = this.userDataOb.subscribe((avatar) => {
      this.avatar = avatar;
    })
    this.verifySessionService.getAvatar(this.token);
  }

}
