import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-preview-production',
  templateUrl: './menu-preview-production.component.html',
  styleUrls: ['./menu-preview-production.component.scss'],
})
export class MenuPreviewProductionComponent implements OnInit {

  @Input() menuObject: object[];
  @Input() left: string;

  constructor() { }

  ngOnInit() {}

  toggleSub(options){
    let down = document.getElementById(options.id + 10 + "");
    let up = document.getElementById(options.id + 20 + "");
    up.hidden = !up.hidden;
    down.hidden = !down.hidden;
    if (up.hidden) {
      this.hideChildren(options.childs);
    } else {
      this.showChildren(options.childs);
    }
  }

  showChildren(childs){
    childs.forEach(element => {
      element.hidden = false;
    })
  }

  hideChildren(childs){
    childs.forEach(element => {
      element.hidden = true;
      if (element.type){
        this.closeSubMenu(element);
      }
    })
  }

  closeSubMenu(element){
    let up = document.getElementById(element.id + 20 + "");
    let down = document.getElementById(element.id + 10 + "");
    down.hidden = false;
    up.hidden = true;
    if(element.childs.length > 0){
      this.hideChildren(element.childs);
    }
  }
}
