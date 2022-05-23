import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AckService} from "./ack.service";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private authService: AckService, private route: Router) {
  }

  canActivate() {
    if (this.authService.isAdmin()) {
      return true;
    }
    this.route.navigate(['/']).then();
    return false;
  }
}
