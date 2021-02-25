import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { EditAccountService } from 'src/app/services/edit-account.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-new-avatar',
  templateUrl: './new-avatar.component.html',
  styleUrls: ['./new-avatar.component.scss'],
})
export class NewAvatarComponent implements OnInit {

  private form: FormGroup
  public fileInput: any = "Empty";
  public imgSrc = "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1";

  constructor(private formBuilder: FormBuilder, 
    private actionSheetController: ActionSheetController, private cameraService: CameraService,
    private edit: EditAccountService, private toast: ToastComponent) {
    this.form = formBuilder.group({
      avatar: ['']
    })
  }

  ngOnInit() {}

  inputSelection(){
    this.presentActionSheet();
  }

  async sendForm(){
    if (this.fileInput == "Empty"){
      this.toast.presentToast("Select a new avatar first!");
    }
    else{
      let formData = new FormData();
      if (this.fileInput.originalFilename){
        formData.append("avatar", this.fileInput, this.fileInput.originalFilename);
      }
      else{
        formData.append("avatar", this.fileInput);
      }
      this.edit.sendChanges("avatar", formData);
    }
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
    console.log(this.fileInput)
  }
}
