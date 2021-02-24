import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {

  private form: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      currentPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

}
