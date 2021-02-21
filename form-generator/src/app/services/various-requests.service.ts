import { Injectable } from '@angular/core';
import { MenuCreationFunctionsService } from './menu-creation-functions.service';

@Injectable({
  providedIn: 'root'
})
export class VariousRequestsService {

  constructor(private menuFunctions: MenuCreationFunctionsService) { }

  requestMenuOptions = async () => {
    let response = await fetch("http://localhost:8000/menus/options", {
      method:"GET",
      credentials:"include"
    })
    let json = await response.json();
    return json;
  }

  saveMenu = async (menuData) => {
    let list = this.menuFunctions.treeToListAll(menuData);
    let response = await fetch("http://localhost:8000/menus", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json"
      }
    })
    let json = await response.json();
    console.log(json);
  }
}
