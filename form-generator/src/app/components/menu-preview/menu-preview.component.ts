import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-preview',
  templateUrl: './menu-preview.component.html',
  styleUrls: ['./menu-preview.component.scss'],
})
export class MenuPreviewComponent implements OnInit {

  @Input() menuObject: object[];
  @Input() left: string;

  constructor() { }

  ngOnInit() {}
}
