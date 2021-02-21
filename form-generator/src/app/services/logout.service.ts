import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { Store } from '@ngxs/store'
import { Observable, Subscription } from 'rxjs';
import { SetToken } from '../store/token/token.action';
import { Token } from '../store/token/token.model';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private token: Token;
  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;

  constructor(private router: Router, private store: Store) { 
    this.tokenOb = this.store.select(state => state.token.token);
    this.tokenSub = this.tokenOb.subscribe((token) => {
      this.token = token;
    })
  }

  endSession(){
    let invToken: any = this.token;
    fetch("http://localhost:8000/users/closeSession", {
      method:"GET",
      credentials:"include",
      headers:{
        'authToken':invToken
      }
    }).then(response => {
      let a: any = "";
      this.store.dispatch(new SetToken(a))
    })
    this.router.navigate(["/login"]);
  }
}
