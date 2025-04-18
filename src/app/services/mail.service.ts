import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private url = 'https://moto-manager-api.martin-julien-dev.fr/contact';

  constructor(private http: HttpClient) { }

  contact(from: string, subject: string, message: string): Observable<any> {
    const body = { "from": from, "subject": subject, "message": message };
    return this.http.post<any>(this.url, body)
  }
}
