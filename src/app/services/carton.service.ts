import {effect, inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Carton} from '../components/models/Carton';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CartonService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'cartons';
  urlParamsString = "";
  commonService = inject(CommonService);

  constructor(private http: HttpClient) {
    effect(() => {
      this.urlParamsString = this.commonService.urlParamsString();
    })
  }

  getAll(){
    this.url = this.baseUrl + 'cartons';
    if (this.urlParamsString) {
      this.url = this.baseUrl + 'cartons' + this.urlParamsString;
    }

    return this.http.get<Carton[]>(this.url);
  }

  getOne(id: number){
    return this.http.get<Carton>(this.url + '/' + id);
  }

  create(carton: Carton){
    return this.http.post<Carton>(this.url, carton);
  }

  update(id: number, room: Carton){
    return this.http.patch<Carton>(this.url + '/' + id, room);
  }

  delete(id: number){
    return this.http.delete<Carton>(this.url + '/' + id);
  }
}
