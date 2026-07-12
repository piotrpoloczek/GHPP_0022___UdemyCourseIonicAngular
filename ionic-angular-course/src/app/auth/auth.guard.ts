import { Injectable } from '@angular/core';
import { Route, CanLoad, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authService.userIsAuthenticatedValue) {
      this.router.navigateByUrl('/auth');
    }
    return this.authService.userIsAuthenticatedValue;
  }
  
}
