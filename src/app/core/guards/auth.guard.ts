import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(public userService: UserService, private router: Router) {
    this.userService.userSessionCheck();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkUserRights(childRoute);
  }

  checkUserRights(route: ActivatedRouteSnapshot) {
    if (this.userService.currentUser === null) {
      this.userService.currentUser = {
        id: '',
        email: '',
        isLogged: false,
        isAdmin: false,
      };
    }
    if (
      (route.data.isLogged === undefined && route.data.isAdmin === undefined) ||
      (route.data.isLogged === false && route.data.isAdmin === false)
    ) {
      return true;
    } else {
      if (route.data.isAdmin === undefined) {
        if (route.data.isLogged === !!this.userService.currentUser.isLogged) {
          return true;
        } else {
          this.router.navigate(['/user/login']);
          return false;
        }
      } else {
        if (
          route.data.isLogged === !!this.userService.currentUser.isLogged &&
          route.data.isAdmin === !!this.userService.currentUser.isAdmin
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
