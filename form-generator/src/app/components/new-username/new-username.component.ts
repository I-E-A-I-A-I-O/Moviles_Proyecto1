import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditAccountService } from 'src/app/services/edit-account.service';
@Component({
  selector: 'app-new-username',
  templateUrl: './new-username.component.html',
  styleUrls: ['./new-username.component.scss'],
})
export class NewUsernameComponent implements OnInit {

  private form: FormGroup

  constructor(private formBuilder: FormBuilder, private edit: EditAccountService) {
    this.form = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

  async sendForm () {
    let formData = new FormData();
    formData.append("username", this.form.value.username);
    formData.append("password", this.form.value.password);
    this.edit.sendChanges("username", formData);
  }
}
