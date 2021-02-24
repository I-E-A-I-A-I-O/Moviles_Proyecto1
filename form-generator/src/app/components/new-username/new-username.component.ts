import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-username',
  templateUrl: './new-username.component.html',
  styleUrls: ['./new-username.component.scss'],
})
export class NewUsernameComponent implements OnInit {

  private form: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

}
