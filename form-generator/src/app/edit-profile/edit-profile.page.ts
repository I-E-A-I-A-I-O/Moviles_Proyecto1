import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private routeParam: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeParam = this.activatedRoute.snapshot.paramMap.get("type");
  }
}
