import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditAccountService } from 'src/app/services/edit-account.service';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.scss'],
})
export class NewEmailComponent implements OnInit {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder, private edit: EditAccountService) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

  async sendForm () {
    let formData = new FormData();
    formData.append("email", this.form.value.email);
    formData.append("password", this.form.value.password);
    this.edit.sendChanges("email", formData);
  }
}
