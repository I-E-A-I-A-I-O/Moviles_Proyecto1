import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-preview',
  templateUrl: './menu-preview.component.html',
  styleUrls: ['./menu-preview.component.scss'],
})
export class MenuPreviewComponent implements OnInit {

  @Input() menuObject: object[];
  @Input() left: string;

  hidden = false;

  constructor() { }

  ngOnInit() {}

  toggleSub(){
    this.hidden = !this.hidden;
  }

  redirect(value){
    console.log(value.value);
  }
}
