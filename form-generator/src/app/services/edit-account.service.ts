import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AlertMessageComponent } from '../components/alert-message/alert-message.component';
import { RequestLoadingComponent } from '../components/request-loading/request-loading.component';
import { SetToken } from '../store/token/token.action';
import { Token } from '../store/token/token.model';
import { LogoutService } from './logout.service';
import { VerifySessionService } from './verify-session.service';

@Injectable({
  providedIn: 'root'
})
export class EditAccountService {

  private tokenOrb: Observable<Token>;
  private tokenSub: Subscription;
  private token;

  constructor(private loading: RequestLoadingComponent, private alert: AlertMessageComponent,
    private store: Store, private requests: VerifySessionService, private logout: LogoutService) { 
      this.tokenOrb = this.store.select(state => state.token.token);
      this.tokenSub = this.tokenOrb.subscribe(token => {
        this.token = token;
      })
  }

  async sendChanges(type: string, formData: FormData){
    this.loading.presentLoading("Saving changes...");
    let route = `http://localhost:8000/users/user/${type}`
    let response = await fetch(route, {
      method: "POST",
      body: formData,
      headers:{
        "authToken": this.token
      }
    })
    let json = await response.json();
    let message = json.content;
    if (type == "username"){
      if (json.title == "Success"){
        this.store.dispatch(new SetToken(json.token));
        await this.requests.getProfile(this.token);
      }
    }
    if (type == "password"){
      if (json.title == "Success"){
        message = `${message}. Closing session`;
        this.logout.endSession();
      }
    }
    if (type == "avatar"){
      await this.requests.getAvatar(this.token);
    }
    this.loading.loadingController.dismiss("", "", "loadingComponent");
    this.alert.presentAlert(json.title, message);

  }
}
