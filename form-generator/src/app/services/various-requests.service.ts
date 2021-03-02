import { Injectable } from '@angular/core';
import { MenuCreationFunctionsService } from './menu-creation-functions.service';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Token } from '../store/token/token.model';
import { AlertMessageComponent } from '../components/alert-message/alert-message.component';
import { RequestLoadingComponent } from '../components/request-loading/request-loading.component';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VariousRequestsService {

  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;
  private token: any;

  constructor(private menuFunctions: MenuCreationFunctionsService, private store: Store,
    private loading: RequestLoadingComponent, private alert: AlertMessageComponent, private router: Router) {
    this.tokenOb = this.store.select(state => state.token.token);
    this.tokenSub = this.tokenOb.subscribe((token) => {
      this.token = token;
    })
  }

  requestMenuOptions = async () => {
    let response = await fetch("http://localhost:8000/menus/options", {
      method:"GET",
      credentials:"include"
    })
    let json = await response.json();
    return json;
  }

  saveMenu = async (menuData: object[]) => {
    this.loading.presentLoading("Saving changes...");
    let list = this.menuFunctions.treeToListAll(menuData);
    let response = await fetch("http://localhost:8000/menus", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json",
        'authToken':this.token
      }
    })
    let json = response.json();
    json.then((jsonContent) => {
      this.loading.loadingController.dismiss("", "", "loadingComponent")
      this.alert.presentAlert(jsonContent.title, jsonContent.content);
    })
  }

  getMenu = async (loadingScreen = true) => {
    if (loadingScreen){ this.loading.presentLoading("Retrieving menu data..."); }
    let response = await fetch("http://localhost:8000/menus", {
      method:"GET",
      credentials:"include"
    })
    let json = response.json().then((data) => {
      if(loadingScreen) { this.loading.loadingController.dismiss("", "", "loadingComponent"); }
      return data;
    })
    return await json;
  }

  getFieldOptions = async() => {
    let response = await fetch("http://localhost:8000/forms/options", {
      method: "GET",
      credentials: "include"
    })
    return await response.json();
  }

  saveNewForm = async(formData: object) => {
    this.loading.presentLoading("Saving form...");
    let response = await fetch("http://localhost:8000/forms", {
      method: "POST",
      credentials:"include",
      body: JSON.stringify(formData),
      headers:{
        "authToken": this.token,
        "Content-Type": "application/json"
      }
    })
    let json = await response.json();
    await this.loading.loadingController.dismiss("", "", "loadingComponent");
    await this.alert.presentAlert(json.title, json.content);
    if (json.title == "Success"){ this.router.navigate(["/admin-home"]); }
  }

  getForm = async (formId: string) => {
    let route = `http://localhost:8000/forms/form/${formId}`;
    let response = await fetch(route, {
      method: "GET",
      credentials: "include",
      headers:{
        "authToken": this.token
      }
    });
    let json = await response.json();
    if (json.title == "Success"){ return json.content; }
    else{
      this.alert.presentAlert(json.title, json.content);
      return null;
    }
  }

  saveAnswers = async(formId: string, answers: any[]) => {
    let route = `http://localhost:8000/forms/form/${formId}`;
    let response = await fetch(route, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(answers),
      headers:{
        "Content-Type": "application/json",
        "authToken": this.token
      }
    });
    let json = await response.json();
    this.alert.presentAlert(json.title, json.content);
    return json.title == "Success";
  }

  async getGlobalFormStats(){
    this.loading.presentLoading("Requesting stats...");
    let response = await fetch("http://localhost:8000/stats/forms", {
      method: "GET",
      credentials: "include"
    })
    let json = await response.json();
    this.loading.loadingController.dismiss("", "", "loadingComponent");
    return json.content;
  }

  async getGlobalUserStats(){
    this.loading.presentLoading("Requesting stats...");
    let response = await fetch("http://localhost:8000/stats/users", {
      method: "GET",
      credentials: "include"
    });
    let json = await response.json();
    this.loading.loadingController.dismiss("", "", "loadingComponent");
    if (json.title == "Error"){
      this.alert.presentAlert(json.title, json.content);
      this.router.navigate(['/admin-home']);
    }
    else { return json.content };
  }
}
