import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  //Injector ==>  بعطية ريفرنس لكلاس معين

constructor(private injector:Injector){}
intercept(req:HttpRequest<any>,next:HttpHandler){
  const authService=this.injector.get(AuthService)
  const modifedUrl=req.clone({
    setHeaders:{
      Authorization:`Bearer ${authService.getToken()}`
    }
  })
return next.handle(modifedUrl)
}












}

