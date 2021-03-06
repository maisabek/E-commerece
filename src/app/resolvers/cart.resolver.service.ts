import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import {CartService} from '../services/cart/cart.service'
@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {

  constructor(private cartService:CartService,private authService:AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> {
  //  if(this.authService.profile){
    return this.cartService.getCart()
  //  }
  }
}
