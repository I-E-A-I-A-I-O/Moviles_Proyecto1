import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariousRequestsService {

  constructor() { }

  requestMenuOptions = async () => {
    let response = await fetch("http://localhost:8000/menus/options", {
      method:"GET",
      credentials:"include"
    })
    let json = await response.json();
    return json;
  }
}
