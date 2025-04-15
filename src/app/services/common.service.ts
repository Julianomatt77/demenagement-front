import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  blurBackground = signal(false)

  constructor() { }

  toggleBlurBackground() {
    this.blurBackground = signal(!this.blurBackground())
  }
}
