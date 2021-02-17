import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  public async takePhoto(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl, 
      source: CameraSource.Camera, 
      quality: 100 
    });
    return capturedPhoto.dataUrl;
  }
}
