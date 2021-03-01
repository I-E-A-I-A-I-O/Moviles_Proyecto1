import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VariousRequestsService } from '../services/various-requests.service';
import { ToastComponent } from '../components/toast/toast.component';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.page.html',
  styleUrls: ['./form-page.page.scss'],
})
export class FormPagePage {

  private routeParam: string;
  private formData: object[] = [];
  private userAnswers: object[] = [];
  private firstTime: boolean = true;
  private title: string = "";
  private answers: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private requests: VariousRequestsService,
  private toast: ToastComponent) { }

  ionViewWillEnter(){
    this.routeParam = this.activatedRoute.snapshot.paramMap.get("id");
    this.getData().then(() => {
      if (!this.firstTime){
        this.toast.presentToast("You already submitted this form!");
      }
    });
  }

  async getData(){
    let data = await this.requests.getForm(this.routeParam);
    this.parseOptions(data.formData);
    this.firstTime = data.firstTime;
    this.formData = data.formData;
    this.userAnswers = data.userAnswers;
    this.title = data.formData[0].form_name;
  }

  parseOptions(rows: any[]){
    for(let i = 0; i < rows.length; i++){
      if (rows[i].options.length > 0){
        for (let n = 0; n < rows[i].options.length; n++){
          rows[i].options[n] = JSON.parse(rows[i].options[n]);
        }
      }
    }
  }

  inputEvent(event: any, id: number){
    let value: string = event.target.value;
    if (value.length < 1){ this.remove(id); }
    else{
      this.addString(id, value);
    }
  }

  radioEvent(event, id: number){
    let value: string = event.target.value;
    this.addRadio(value, id);
  }

  addRadio(value, id){
    for(let i = 0; i < this.answers.length; i++){
      if (this.answers[i].id == id){
        this.answers[i].answer[0] = value;
        return;
      }
    }
    this.answers.push({ id: id, answer: [value] });
  }

  addString(id: number, answer: string){
    for(let i = 0; i < this.answers.length; i++){
      if (this.answers[i].id == id){
        this.answers[i].answer.splice(0, this.answers[i].answer.length);
        this.answers[i].answer.push(answer);
        return;
      }
    }
    this.answers.push({ id: id, answer: [answer] });
  }

  checkboxEvent(event, id: number, label: string){
    let checked = event.target.checked;
    if (checked){
        this.addCheckbox(id, label);
    }
    else{
      this.removeCheckbox(id, label);
    }
  }

  removeCheckbox(id: number, label: string){
    for (let i = 0; i < this.answers.length; i++){
      if (this.answers[i].id == id){
        for (let n = 0; n < this.answers[i].answer.length; n++){
          if (this.answers[i].answer[n] == label){
            this.answers[i].answer.splice(n, 1);
            if (this.answers[i].answer.length == 0){
              this.answers.splice(i, 1);
              return;
            }
          }
        }
      }
    }
  }

  addCheckbox(id: number, label: string){
    for (let i = 0; i < this.answers.length; i++){
      if (this.answers[i].id == id){
        this.answers[i].answer.push(label);
        return;
      }
    }
    this.answers.push({ id: id, answer: [label] });
  }

  remove(id: number){
    for(let i = 0; i < this.answers.length; i++){
      if(this.answers[i].id == id){
        this.answers.splice(i, 1);
        return;
      }
    }
  }

  async sendForm(){
    let response = await this.requests.saveAnswers(this.routeParam, this.answers);
    this.firstTime = !response;
  }
}
