import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'page-forms',
  templateUrl: './page-forms.page.html',
  providers:[NavParams, NavController],
})

export class PageFormsPage implements OnInit {

  public form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formbuilder: FormBuilder) { 
    this.form = this.formbuilder.group({
      name : ['', Validators.required],
      technologies : this.formbuilder.array([
         this.initTechnologyFields()
      ])
    })
  }

   initTechnologyFields() : FormGroup{
      return this.formbuilder.group({
         name : ['', Validators.required]
      });
   }

   addNewInputField() : void{
      const control = <FormArray>this.form.controls.technologies;
      control.push(this.initTechnologyFields());
   }

   removeInputField(i : number) : void{
      const control = <FormArray>this.form.controls.technologies;
      control.removeAt(i);
   }

   manage(val : any) : void{
      console.log(val);
   }
   
   ngOnInit() {

   }

}
