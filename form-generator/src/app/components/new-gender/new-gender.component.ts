import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrls: ['./new-gender.component.scss'],
})
export class NewGenderComponent implements OnInit {

  private form: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

}
