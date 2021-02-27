import { Injectable } from '@angular/core';
import { MenuCreationFunctionsService } from './menu-creation-functions.service';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Token } from '../store/token/token.model';
import { AlertMessageComponent } from '../components/alert-message/alert-message.component';
import { RequestLoadingComponent } from '../components/request-loading/request-loading.component';

@Injectable({
  providedIn: 'root'
})
export class VariousRequestsService {

  private tokenOb: Observable<Token>;
  private tokenSub: Subscription;
  private token: any;

  constructor(private menuFunctions: MenuCreationFunctionsService, private store: Store,
    private loading: RequestLoadingComponent, private alert: AlertMessageComponent) {
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

  saveMenu = async (menuData) => {
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
}
