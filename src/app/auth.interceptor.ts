import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

const TOKEN_KEY = environment.token_name;

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
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
