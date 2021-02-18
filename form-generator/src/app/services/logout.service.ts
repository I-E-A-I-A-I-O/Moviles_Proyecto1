import { Injectable } from '@angular/core';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  endSession(){
    fetch("http://localhost:8000/users/closeSession", {
      method:"GET",
      credentials:"include"
    })
    this.router.navigate(["/login"]);
  }
}
