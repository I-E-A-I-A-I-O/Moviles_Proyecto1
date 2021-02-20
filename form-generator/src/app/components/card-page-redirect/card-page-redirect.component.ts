import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-page-redirect',
  templateUrl: './card-page-redirect.component.html',
  styleUrls: ['./card-page-redirect.component.scss'],
})
export class CardPageRedirectComponent implements OnInit {

  properties: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.properties = [
      {
        route: "/forms/creation",
        src: "https://netsapiens.com/wp-content/uploads/2019/01/Fill-Out-Form1.png",
        title: "Forms creator",
        description: "Create and share forms for others to use"
      },
      {
        route:"/menu/creation",
        src:"https://image.flaticon.com/icons/svg/161/161413.svg",
        title:"Menu creator",
        description:"Create menus that regular users will use"
      },
      {
        route:"/forms/stats",
        src:"https://image.flaticon.com/icons/png/512/36/36170.png",
        title:"Form stats",
        description:"Preview created forms usage statistics"
      }
    ]
  }

  redirect(where){
    this.router.navigate([where])
  }
}
