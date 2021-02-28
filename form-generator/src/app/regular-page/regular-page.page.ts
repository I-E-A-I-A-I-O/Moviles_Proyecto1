import { Component, OnInit } from '@angular/core';
import { RegularMenuComponent } from '../components/regular-menu/regular-menu.component';

@Component({
  selector: 'app-regular-page',
  templateUrl: './regular-page.page.html',
  styleUrls: ['./regular-page.page.scss'],
})
export class RegularPagePage implements OnInit {

  constructor(private menu: RegularMenuComponent) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menu.requestMenu();
  }

  openMenu(){
    this.menu.openMenu();
  }
}
