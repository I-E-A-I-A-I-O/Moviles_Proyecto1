import { Component, OnInit } from '@angular/core';
import { VerifySessionService } from 'src/app/services/verify-session.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {

  avatarSrc: string = "";

  constructor(private verifySessionService: VerifySessionService) { }

  ngOnInit() {
    this.verifySessionService.getAvatar().then(json => {
      this.avatarSrc = json.avatar || "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1";
    })
  }

}
