import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RequestLoadingComponent } from '../request-loading/request-loading.component';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { Router } from '@angular/router';

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

  showAlert(title, message){
    this.alertController.presentAlert(title, message);
  }

  dismissLoading(){
    this.loadingComponent.loadingController.dismiss("", "", "loadingComponent");
  }
}