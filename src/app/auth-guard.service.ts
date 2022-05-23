import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AckService} from './ack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AckService, private route: Router) {
  }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.route.navigate(['/loginuser']).then();
    return false;
  }
}
