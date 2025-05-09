import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const USER_KEY = environment.user_key;
const TOKEN_KEY = environment.token_name;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    // document.cookie = USER_KEY + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // document.cookie = TOKEN_KEY + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    // const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString(); // 2 jours
    // document.cookie = USER_KEY+`=${encodeURIComponent(JSON.stringify(user))}; expires=${expires}; path=/; SameSite=Strict`;
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    // const nameEQ = USER_KEY + "=";
    // const ca = document.cookie.split(';');
    // for (let i = 0; i < ca.length; i++) {
    //   let c = ca[i].trim();
    //   if (c.indexOf(nameEQ) === 0) {
    //     return JSON.parse(decodeURIComponent(c.substring(nameEQ.length)));
    //   }
    // }
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    // const user = this.getCookie(TOKEN_KEY);
    // return !!user;
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  }

}
