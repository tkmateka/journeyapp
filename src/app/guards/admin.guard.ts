import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    console.log('user', user['role'])

    if (user['role'] != 'admin') {
      this.snackBar.open("Sorry, you don't have access to this page", 'Ok');
      this.router.navigate(['/base/login']);
    }

    return (user['role'] != 'admin') ? false : true;
  }
}
