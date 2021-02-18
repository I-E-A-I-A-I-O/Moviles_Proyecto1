import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CameraService } from 'src/app/services/camera.service';
import { ActionSheetController } from '@ionic/angular'
import { RequestLoadingComponent } from '../request-loading/request-loading.component';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import {Router} from '@angular/router';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  private form: FormGroup;
  public age: number;
  public fileInput: any = "";
  public imgSrc = "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1";

  constructor(private formBuilder: FormBuilder, public cameraService: CameraService, 
    private actionSheetController: ActionSheetController,
    public loadingComponent: RequestLoadingComponent, 
    public alertController: AlertMessageComponent,
    private router: Router) { 
    this.form = formBuilder.group({
      username: ['',[ Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      email: ['', [Validators.email, Validators.required]],
      age: [0, [Validators.min(12), Validators.max(120)]],
      avatar: [''],
      gender: ['']
    })
  }

  ngOnInit() {}

  registerUser(){
    this.showLoading();
    let formData = new FormData();
    formData.append("username", this.form.value.username);
    formData.append("password", this.form.value.password);
    formData.append("email", this.form.value.email);
    formData.append("age", this.form.value.age);
    formData.append("gender", this.form.value.gender);
    if (this.fileInput.originalFilename){
      formData.append("avatar", this.fileInput, this.fileInput.originalFilename);
    }
    else{
      formData.append("avatar", this.fileInput);
    }
    fetch("http://localhost:8000/users", {
      method:"POST",
      body:formData,
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
      this.loadingComponent.loadingController.dismiss("", "", "loadingComponent");
      this.showAlert(json.title, json.content);
      location.href= "http://localhost:8100/login";
    });
  }

  fileInputEvent(data){
    this.fileInput = data.target.files[0];
    let reader = new FileReader();
    reader.onload = (event:any) => {
      this.imgSrc = event.target.result;
    }
    reader.readAsDataURL(this.fileInput); 
  }

  triggetFileInput(){
    document.getElementById("imgInput").click();
  }

  useCamera(){
    this.cameraService.takePhoto().then(photoData => {
      this.imgSrc = photoData;
      this.fileInput = this.dataURLtoBlob(photoData);
      this.fileInput.originalFilename = "image." + this.fileInput.type.split("/")[1];
    });
  }

  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Select image source',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.useCamera();
        }
      }, {
        text: 'Browse files',
        icon: 'folder',
        handler: () => {
          this.triggetFileInput();
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  inputSelection(){
    this.presentActionSheet();
  }

  showLoading(){
    this.loadingComponent.presentLoading("Creating account...");
  }

  showAlert(title, message){
    this.alertController.presentAlert(title, message);
  }
}