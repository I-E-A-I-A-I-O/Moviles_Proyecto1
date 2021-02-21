import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifySessionService {

  constructor(private router: Router) { }

  verifySessionActive(token){
    fetch("http://localhost:8000/users/connectedUser",{
      method: "GET",
      credentials: "include",
      headers:{
        'authToken': token
      }
    }).then(response => response.json())
    .then(json => {
      if(!json.title.includes("Success")){
        this.router.navigate(["/home"])
      }
    }).catch(() => {
      this.router.navigate(["/home"])
    })
  }

  getProfile = async (token) =>{
    let response = await fetch("http://localhost:8000/users/user", {
      method:"GET",
      credentials:"include",
      headers:{
        'authToken':token
      }
    })
    let json = await response.json();
    return json;
  }

  getAvatar = async (token) => {
    let response = await fetch("http://localhost:8000/users/user/avatar", {
      method:"GET",
      credentials:"include",
      headers:{
        'authToken': token
      }
    })
    let json = await response.json();
    return json;
  }
}
