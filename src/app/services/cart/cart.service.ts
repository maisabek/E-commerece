import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/models/cart';
import {Observable} from 'rxjs'
import { CartItem } from 'src/app/models/cart-item';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartUrl:any='https://fakestoreapi.com/carts'
  constructor(private http:HttpClient){}
  // private cartUrl=''
  private cartItemUrl=''
  private errorHandler:ErrorHandler=new ErrorHandler()
  getCart():Observable<any>{
    try{
   return this.http.get<any>(`assets/data/cart.json`)
    }catch(err){
     this.errorHandler.handleError(err)
    }
  }
  getCartItem(id:number):Observable<CartItem>{
    try{
     return this.http.get<any>(`${this.cartUrl}/${id}`)
    }catch(err){
     this.errorHandler.handleError(err)
    }
  }
  dates=[]
  pushDates(date:any){
    this.dates.push(date)
  }
  clearCartProduct(id:number):Observable<Cart>{
    try{
    return this.http.delete<any>(`${this.cartUrl}/ ${id}`)
    }catch(err){
    this.errorHandler.handleError(err)
    }
  }
  placeOrder(cartItemId:number,productId:number,
            createOrderDto:any):Observable<void>{
    try{
      return this.http.post<void>(`${this.cartUrl}/${cartItemId}/products/${productId}`
      ,createOrderDto)
    }catch(err){
      this.errorHandler.handleError(err)
    }
  }
  checkOut(cartItemId:number,createOrderDto:any):Observable<void>{
    try{
     return this.http.post<any>(`${this.cartItemUrl}/${cartItemId}`,{createOrderDto})
    }catch(err){
     this.errorHandler.handleError(err)
    }
  }
  removeFromCart(cartItemId:number,productId:number):Observable<CartItem>{
   try{
   return this.http.delete<any>(`${this.cartItemUrl}/${cartItemId}`)
   }catch(err){
    this.errorHandler.handleError(err)
   }
  }

}
