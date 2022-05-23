import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AckService} from "./ack.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public Ack: AckService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let idToken = null;
    if (this.Ack.isAdmin()) {
      idToken = localStorage.getItem("admin");
    } else {
      idToken = localStorage.getItem("user");
    }


    if (idToken !== null) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
