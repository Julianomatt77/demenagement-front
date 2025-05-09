import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

const TOKEN_KEY = environment.token_name;

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // const user = getCookie(TOKEN_KEY);
  // const idToken = getCookie(environment.token_name);
  const idToken = window.sessionStorage.getItem(TOKEN_KEY);

  if (idToken) {
    const cloned = req.clone({
      headers: req.headers.set("Authorization",
        "Bearer " + idToken)
    });

    return next(cloned);
  }
  else {
    return next(req);
  }

}

function getCookie(name: string): string | null {
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

