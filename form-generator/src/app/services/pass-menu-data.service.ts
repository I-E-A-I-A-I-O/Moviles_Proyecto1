import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PassMenuDataService {

  execChange: Subject<any> = new Subject<any>();

  constructor() {}

  setMenuData(data: any) {
    this.execChange.next(data);
  }
}
