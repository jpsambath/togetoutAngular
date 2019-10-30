import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private messageService:MessageService, private authService: AuthService, private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("AuthService authenticated : "+this.authService.authenticated) ;
    console.log("Token en local storage ? " + localStorage.getItem('token') != null ? localStorage.getItem('token') : "null") ;

      if(localStorage.getItem('token')!= null) {
        this.authService.authenticated = true;
        this.authService.token = localStorage.getItem('token');
        this.authService.getUserInfo().then(
          ()=>{
            return true;
          },
          ()=>{
            return false;
          });
        return true;
      }
      else {
        this.router.navigate(['/login']);

    }
  }


}
