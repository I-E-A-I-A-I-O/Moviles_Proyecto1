import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store'
import { SetAvatar, SetUser } from '../store/user/user.action';

@Injectable({
  providedIn: 'root'
})
export class VerifySessionService {

  constructor(private router: Router, private store: Store) { }

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
    this.store.dispatch(new SetUser(json.username));
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
    let avatar = json ? json.avatar : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1";
    this.store.dispatch(new SetAvatar(avatar));
  }
}
