import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RequestLoadingComponent } from '../request-loading/request-loading.component';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import {Router} from '@angular/router';

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
    private router:Router) {

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

    if(this.from.value.username == "" && this.from.value.password ==""){
      this.showAlert("fields is empty","please fill in all fields correctly");
      return;
    }

    fetch("http://localhost:8000/users", {
      method:"POST",
      body:formData,
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
      if(json.message == "ok"){
          this.loadingComponent.loadingController.dismiss("", "", "loadingComponent");
          this.showAlert(json.title, json.content);
          location.href= "http://localhost:8100/session";
      }else{
        this.showAlert("Rellenar en el login.component", "Rellenar en el login.component");
        location.href= "http://localhost:8100/login";
      }
    }).catch(err => this.showAlert("Catch error",err));
  }

   showLoading(){
    this.loadingComponent.presentLoading("Loading...");
  }

  showAlert(title, message){
    this.alertController.presentAlert(title, message);
  }

}
