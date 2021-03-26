import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators'
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService,private router:Router){}
  intercept(req:HttpRequest<any>,next:HttpHandler){
   return next.handle(req).pipe(
     catchError( (err:HttpErrorResponse) => {
        if ([401,403].indexOf(err.status) !== -1){
         this.authService.userLogout()
       } else if(err.status === 404){
        this.router.navigate(['/resourceNotFound',err.status],{queryParams:{"error-status":err.status}})
       } else {
        this.router.navigate(['/applicationError',err.status],{queryParams:{"error-status":err.status}})
       }
       const error=err.message || err.statusText
       return throwError(error)
     })
   )
  }

}
















