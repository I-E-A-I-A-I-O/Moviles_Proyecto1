import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.page.html',
  styleUrls: ['./form-page.page.scss'],
})
export class FormPagePage implements OnInit {

  private routeParam: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParam = this.activatedRoute.snapshot.paramMap.get("id");
  }

}
