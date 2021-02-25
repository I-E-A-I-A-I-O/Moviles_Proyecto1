import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditAccountService } from 'src/app/services/edit-account.service';

@Component({
  selector: 'app-new-age',
  templateUrl: './new-age.component.html',
  styleUrls: ['./new-age.component.scss'],
})
export class NewAgeComponent implements OnInit {

  private value: number;
  private form: FormGroup

  constructor(private formBuilder: FormBuilder, private edit: EditAccountService) {
    this.form = formBuilder.group({
      age: ['', [Validators.required, Validators.min(12), Validators.maxLength(120)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

  sendForm(){
    let formData = new FormData();
    formData.append("age", this.form.value.age);
    formData.append("password", this.form.value.password);
    this.edit.sendChanges("age", formData);
  }
}
