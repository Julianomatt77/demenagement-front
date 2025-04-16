import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Carton} from '../components/models/Carton';

@Injectable({
  providedIn: 'root'
})
export class CartonService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'cartons';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Carton[]>(this.url);
  }

  getOne(id: number){
    return this.http.get<Carton>(this.url + '/' + id);
  }

  create(room: Carton){
    return this.http.post<Carton>(this.url, room);
  }

  update(id: number, room: Carton){
    return this.http.patch<Carton>(this.url + '/' + id, room);
  }

  delete(id: number){
    return this.http.delete<Carton>(this.url + '/' + id);
  }
}
