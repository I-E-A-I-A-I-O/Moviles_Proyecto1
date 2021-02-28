import { Component, OnInit } from '@angular/core';
import { VariousRequestsService } from '../services/various-requests.service';
import { PopoverComponent } from '../components/popover/popover.component';
import { ToastComponent } from '../components/toast/toast.component';

@Component({
  selector: 'page-forms',
  templateUrl: './page-forms.page.html',
  styleUrls: ['./page-forms.page.scss'],
})

export class PageFormsPage implements OnInit {

  private form = { title: "Form title", fields: [] }

  constructor(private requests: VariousRequestsService, private popoverComponent: PopoverComponent,
    private toast: ToastComponent) { }

  ngOnInit() {

  }

  addField(){
    this.form.fields.push({id: 1, data_type: "string", label: `Question #${this.form.fields.length + 1}`, options: []});
  }

  async presentPopover(index: number){
    let selection = await this.popoverComponent.presentPopOver();
    switch(selection){
      case "Text":{
        this.form.fields[index] = {id: 1, data_type: "string", label: `Question #${this.form.fields.length + 1}`, options: []};
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

  addOption(index: number){
    let length = this.form.fields[index].options.length;
    this.form.fields[index].options.push({label: `Option #${length + 1}`});
  }

  deleteOption(indexI: number, indexN: number){
    this.form.fields[indexI].options.splice(indexN, 1);
  }

  async saveForm(){
    if(this.form.fields.length > 0){
      this.requests.saveNewForm(this.form);
    }
    else{
      this.toast.presentToast("Add at least one question!");
    }
  }
}
