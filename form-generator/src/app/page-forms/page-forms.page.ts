import { Component, OnInit } from '@angular/core';
import { VariousRequestsService } from '../services/various-requests.service';
import { PopoverComponent } from '../components/popover/popover.component';

@Component({
  selector: 'page-forms',
  templateUrl: './page-forms.page.html',
  styleUrls: ['./page-forms.page.scss'],
})

export class PageFormsPage implements OnInit {

  private form = { title: "Form title", fields: [] }

  constructor(private requests: VariousRequestsService, private popoverComponent: PopoverComponent) { }

  ngOnInit() {
    this.requests.getFieldOptions().then(options => {
      console.log(options);
    })
  }

  addField(){
    this.form.fields.push({id: 1, data_type: "string", label: `Question #${this.form.fields.length + 1}`});
  }

  async presentPopover(index){
    let selection = await this.popoverComponent.presentPopOver();
    switch(selection){
      case "Text":{
        this.form.fields[index] = {id: 1, data_type: "string", label: `Question #${this.form.fields.length + 1}`};
        break;
      }
      case "Single":{
        this.form.fields[index] = { id: 2, data_type: "radio", 
        label: `Question #${index + 1}`, options: [{label: "Option #1"}, {label: "Option #2"}]};
        break;
      }
      case "Multiple":{
        this.form.fields[index] = { id: 3, data_type: "checkbox", 
        label: `Question #${index + 1}`, options: [{label: "Option #1"}, {label: "Option #2"}]};
        break;
      }
      case "Delete":{
        this.form.fields.splice(index, 1);
        break;
      }
      default:{
        console.log("no selection");
        break;
      }
    }
  }

  addOption(index){
    let length = this.form.fields[index].options.length;
    this.form.fields[index].options.push({label: `Option #${length + 1}`});
  }

  deleteOption(indexI, indexN){
    this.form.fields[indexI].options.splice(indexN, 1);
  }
}
