import { Component, OnInit } from '@angular/core';
import { VerifySessionService } from '../services/verify-session.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {

  constructor(public sessionVerifier: VerifySessionService) { }

  ngOnInit() {
    this.sessionVerifier.verifySessionActive();
  }

}
