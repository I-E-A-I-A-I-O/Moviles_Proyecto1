import { ReadVarExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

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
