import {Injectable, signal} from '@angular/core';
import {Room} from '../components/models/Room';
import {Carton} from '../components/models/Carton';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  blurBackground = signal(false);
  rooms = signal<Room[]>([]);
  cartons = signal<Carton[]>([]);

  constructor() { }

  toggleBlurBackground() {
    this.blurBackground = signal(!this.blurBackground())
  }

  setRooms(rooms: Array<Room>){
    this.rooms.set(rooms);
  }

  setCartons(cartons: Array<Carton>){
    this.cartons.set(cartons);
  }
}
