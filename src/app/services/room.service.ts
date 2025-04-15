import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Room} from '../components/models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'rooms';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Room[]>(this.url);
  }

  getOne(id: number){
    return this.http.get<Room>(this.url + '/' + id);
  }

  create(room: Room){
    return this.http.post<Room>(this.url, room);
  }

  update(id: number, room: Room){
    return this.http.patch<Room>(this.url + '/' + id, room);
  }

  delete(id: number){
    return this.http.delete<Room>(this.url + '/' + id);
  }
}
