import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private router : Router) { }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(localStorage.getItem('admin_token')) {
      return true;
    }
    else {
      this.router.navigate(['/']);
    }
  }
}
