import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/porduct';
import {Observable} from 'rxjs'
import { OrderService } from '../services/order/order.service';
import { ProductService } from '../services/product/product.service';
@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product[]> {

  constructor(private productService:ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]>  {
  return this.productService.getProducts()
  }
  
}
