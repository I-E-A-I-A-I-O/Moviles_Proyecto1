import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditAccountService } from 'src/app/services/edit-account.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder, private edit: EditAccountService) {
    this.form = formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      currentPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

  async sendForm () {
    let formData = new FormData();
    formData.append("newPassword", this.form.value.newPassword);
    formData.append("currentPassword", this.form.value.currentPassword);
    this.edit.sendChanges("password", formData);
  }
}
