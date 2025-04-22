import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private baseUrl = environment.baseUrl;
  private tokenName = environment.token_name;
  private loginUrl = this.baseUrl + 'login_check';
  private registerUrl = this.baseUrl + 'register';
  private userInfosUrl = this.baseUrl + 'users-infos';

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {}

  login(username: string, password?: string): Observable<any> {
    this.isAuthenticatedSubject.next(true);
    return this.http
      .post(this.loginUrl, {
        username,
        password,
      })
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  saveToken(token: string): void {
    const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString(); // 2 jours
    document.cookie = `${this.tokenName}=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Strict`;
  }

  getToken(): string | null {
    const nameEQ = this.tokenName + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): Observable<any> {
    this.storageService.clean();
    this.isAuthenticatedSubject.next(false);
    this.router.navigateByUrl('');

    return this.isAuthenticatedSubject;
  }

  getUserInfos(): Observable<any> {
    return this.http.get(this.userInfosUrl);
  }

  register(username: string,  email: string, password: string){
    return this.http.post<any>(this.registerUrl, {
      username,
      email,
      password,
    });
  }

}
