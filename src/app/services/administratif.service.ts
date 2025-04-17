import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Administratif} from '../components/models/administratif';

@Injectable({
  providedIn: 'root'
})
export class AdministratifService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'administratif';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Administratif[]>(this.url);
  }

  getOne(id: number){
    return this.http.get<Administratif>(this.url + '/' + id);
  }

  create(administratif: Administratif){
    return this.http.post<Administratif>(this.url, administratif);
  }

  update(id: number, administratif: Administratif){
    return this.http.patch<Administratif>(this.url + '/' + id, administratif);
  }

  delete(id: number){
    return this.http.delete<Administratif>(this.url + '/' + id);
  }
}
