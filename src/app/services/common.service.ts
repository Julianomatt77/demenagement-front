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
  url = new URL(window.location.href)
  urlParamsString = signal(this.url.search)

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

  readUrlParameters(): { name: string, value: string }[] {
    const urlParams: { name: string, value: string }[] = [];

    const queryString = decodeURIComponent(window.location.search.substring(1));
    const parts = queryString.split('&');

    for (const part of parts) {
      const [paramName, paramValue] = part.split('=');

      urlParams.push({ name: paramName, value: paramValue });
    }

    return urlParams;
  }

  setAnyParmam(param: string, value: string){
    this.updateUrlParameter(param, value);
    let url = new URL(window.location.href)
    this.setUrlParamsString(url.search)
  }

  deleteParam(param: string) {
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    if (urlParams.has(param)) {
      url.searchParams.delete(param)
      urlParams.delete(param);
      this.setUrlParamsString(url.search.toString());
      window.history.replaceState({}, '', url.toString());
    }
  }

  private updateUrlParameter(key: string, value: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url.toString());
  }

  setUrlParamsString(params: string){
    this.urlParamsString.set(params)
  }
}
