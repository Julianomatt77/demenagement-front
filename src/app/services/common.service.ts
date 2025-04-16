import {Injectable, signal} from '@angular/core';
import {Room} from '../components/models/Room';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  blurBackground = signal(false);
  rooms = signal<Room[]>([]);

  constructor() { }

  toggleBlurBackground() {
    this.blurBackground = signal(!this.blurBackground())
  }

  setRooms(rooms: Array<Room>){
    this.rooms.set(rooms);
  }
}
