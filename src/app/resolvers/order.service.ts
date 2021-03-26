import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Order } from '../models/order';
import {Observable} from 'rxjs'
import { OrderService } from '../services/order/order.service';
@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<Order[]>{

  constructor(private orderService:OrderService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]>  {
    return this.orderService.getOrders()
  }
}
