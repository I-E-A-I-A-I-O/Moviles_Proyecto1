import { Component, OnInit } from '@angular/core';
import { VerifySessionService } from 'src/app/services/verify-session.service';
import { Store } from '@ngxs/store'
import { Observable, Subscription } from 'rxjs';
import { Token } from 'src/app/store/token/token.model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {

  avatarSrc: string = "";
  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;
  private token: Token;

  constructor(private verifySessionService: VerifySessionService, private store: Store) { 
    this.tokenOb = this.store.select(state => state.token.token);
  }

  ngOnDestroy(){
    this.tokenSub.unsubscribe();
  }

  ngOnInit() {
    this.tokenSub = this.tokenOb.subscribe((token) => {
      this.token = token;
    })
    this.verifySessionService.getAvatar(this.token).then(json => {
      this.avatarSrc = json.avatar || "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1";
    })
  }

}
