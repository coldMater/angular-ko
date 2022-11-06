// #docregion
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn) { return true; }

    // 로그인한 후 리다이렉트할 수 있도록 URL을 저장합니다.
    this.authService.redirectUrl = url;

    // 로그인하지 않았기 때문에 로그인 페이지로 이동합니다.
    return this.router.parseUrl('/login');
  }
}
// #enddocregion
