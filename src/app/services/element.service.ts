import { Injectable } from '@angular/core';
import {Element} from '../components/models/Element';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'elements';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Element[]>(this.url);
  }

  getOne(id: number){
    return this.http.get<Element>(this.url + '/' + id);
  }

  create(room: Element){
    return this.http.post<Element>(this.url, room);
  }

  update(id: number, element: Element){
    return this.http.patch<Element>(this.url + '/' + id, element);
  }

  delete(id: number){
    return this.http.delete<Element>(this.url + '/' + id);
  }
}
