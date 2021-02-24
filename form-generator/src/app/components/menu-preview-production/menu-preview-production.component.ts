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
    let up = document.getElementById(options.id);
    up.hidden = !up.hidden;
    down.hidden = !down.hidden;
    if (options.childs.length > 0){
      this.toggleChildren(options.childs, !down.hidden);
    }
  }

  toggleChildren(childArr, state){
    childArr.forEach(child => {
      child.hidden = state;
      if (child.childs){
        if (child.childs.length > 0){
          this.toggleChildren(child.childs, state);
        }
      }
    })
  }
}
