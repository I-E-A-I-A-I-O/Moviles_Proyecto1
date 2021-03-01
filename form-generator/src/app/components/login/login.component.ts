import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RequestLoadingComponent } from '../request-loading/request-loading.component';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { Router } from '@angular/router';
import { VerifySessionService } from 'src/app/services/verify-session.service';
import { Store } from '@ngxs/store'
import { SetToken } from 'src/app/store/token/token.action';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public from: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public loadingComponent: RequestLoadingComponent,
    public alertController: AlertMessageComponent,
    private router:Router,
    public verifySessionService: VerifySessionService,
    private store: Store) {

    this.from = formBuilder.group({
      username: ['',[ Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

  userLogin(){
    this.showLoading()
    let formData = new FormData();
    formData.append("username", this.from.value.username);
    formData.append("password", this.from.value.password);

    fetch("http://localhost:8000/users/userLogin", {
      method:"POST",
      body:formData,
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
      this.dismissLoading();
      if(json.title.includes("Error")){
        this.showAlert("Login error", json.content);
      }
      else{
        this.store.dispatch(new SetToken(json.token));
        this.verifySessionService.getProfile(json.token);
        this.verifySessionService.getAvatar(json.token);
        if (json.role.includes("admin")){
          this.router.navigate(["/admin-home"])
        }
        else{
          this.router.navigate(["/regular-home"])
        }
      }
    }).catch(err => this.showAlert("Catch error",err));
  }

   showLoading(){
    this.loadingComponent.presentLoading("Loading...");
  }

  showAlert(title: string, message: string){
    this.alertController.presentAlert(title, message);
  }

  dismissLoading(){
    this.loadingComponent.loadingController.dismiss("", "", "loadingComponent");
  }
}
