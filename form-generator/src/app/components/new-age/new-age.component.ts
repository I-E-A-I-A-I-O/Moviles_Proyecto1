import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-age',
  templateUrl: './new-age.component.html',
  styleUrls: ['./new-age.component.scss'],
})
export class NewAgeComponent implements OnInit {

  private value: number;
  private form: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      age: ['', [Validators.required, Validators.min(12), Validators.maxLength(120)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  ngOnInit() {}

}
