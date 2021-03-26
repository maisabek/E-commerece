import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';
import { of, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements Resolve<User[]> {

  constructor(private authService:AuthService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<User[]>{
    return this.authService.getSystemUser()
  }
}
