import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditAccountService } from 'src/app/services/edit-account.service';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrls: ['./new-gender.component.scss'],
})
export class NewGenderComponent implements OnInit {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder, private edit: EditAccountService) {
    this.form = formBuilder.group({
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

  async sendForm () {
    let formData = new FormData();
    formData.append("gender", this.form.value.gender);
    formData.append("password", this.form.value.password);
    this.edit.sendChanges("gender", formData);
  }
}
