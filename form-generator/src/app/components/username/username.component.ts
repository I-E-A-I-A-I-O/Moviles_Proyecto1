import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/store/user/user.model';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent implements OnInit {

  private username: any;
  private usernameOb: Observable<User>;
  private usernameSub: Subscription;

  constructor(private store: Store) {
    this.usernameOb = this.store.select(state => state.user.user.username);
  }

  ngOnInit() {
    this.usernameSub = this.usernameOb.subscribe((username) => {
      this.username = username;
    })
  }

  ngOnDestroy(){
    this.usernameSub.unsubscribe();
  }

}
