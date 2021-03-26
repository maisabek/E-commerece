import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import {environment} from '../../../environments/environment'
import { Product } from 'src/app/models/porduct';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private errorHandler: ErrorHandler = new ErrorHandler()
  private orderUrl = ''

  constructor(private http: HttpClient) {
  }

  // for admin staff
  getOrders(): Observable<Order[]> {
    try {
      return this.http.get<Order[]>(this.orderUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  // for user staff
  getUserOrder(orderId: number): Observable<Order> {
    try {
      return this.http.get<Order>(`${this.orderUrl}/${orderId}`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  orders=[]
  insertToOrder(product:Product){
    this.orders.push(product)
  }
}
