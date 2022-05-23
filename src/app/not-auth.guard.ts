import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AckService} from "./ack.service";

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(private authService: AckService, private route: Router) {
  }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    this.route.navigate(['/']).then();
    return false;
  }

}
