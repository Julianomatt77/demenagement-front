import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Demenageur} from '../components/models/Demenageur';

@Injectable({
  providedIn: 'root'
})
export class DemenageurService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'demenageurs';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Demenageur[]>(this.url);
  }

  getOne(id: number){
    return this.http.get<Demenageur>(this.url + '/' + id);
  }

  create(data: Demenageur){
    return this.http.post<Demenageur>(this.url, data);
  }

  update(id: number, data: Demenageur){
    return this.http.patch<Demenageur>(this.url + '/' + id, data);
  }

  delete(id: number){
    return this.http.delete<Demenageur>(this.url + '/' + id);
  }
}
