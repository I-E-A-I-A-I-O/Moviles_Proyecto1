import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit {

  @Output() selection = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  private options = [
    {
      name: "Menu",
      icon: "add",
      action: "Create menu"
    },
    {
      name: "Submenu",
      icon: "add",
      action: "Create submenu"
    },
    {
      name: "Option",
      icon: "add",
      action: "Add option"
    },
    {
      name: "Delete",
      icon: "trash",
      action: "Delete element"
    },
    {
      name: "Save",
      icon: "save",
      action: "Save menu"
    }
  ]

  onSelection(value){
    this.selection.emit(value);
  }
}
