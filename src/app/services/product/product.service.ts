import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/porduct'
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl:any='https://fakestoreapi.com/products'
  cartUrl:any='https://fakestoreapi.com/carts'
  color:string="#FF847C"
  Product:Product[]
  quantity:number
  totalPrice:number=0
  // productUrl:any='https://fakestoreapi.com/products'
  // cartUrl:any='https://fakestoreapi.com/carts'
  private errorHandler: ErrorHandler = new ErrorHandler();
  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }
  getProducts(): Observable<Product[]> {
    try {
      return this.http.get<Product[]>(`assets/data/products.json`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getProductById(id: number): Observable<any> {
    try {
      const urlById = `${this.productUrl}/${id}`;
      return this.http.get<Product>(urlById);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  comments=[]
  pushComments(comment:string){
    this.comments.push(comment)
  }
  items=[]
  insertToCart(product:Product){
    this.items.push(product)
  }

  quantities=[]
  addQuantites(quantity:number){
   this.quantities.push(quantity)
  }
  length:any
  removeFromCart(index) {
  //  this.totalPrice-=Math.ceil(this.items[index]+this.quantities[index-1])
    this.items.splice(index, 1);
   this.length=this.items.length-1
    if(this.items.length == 0){
      this.totalPrice=0
    }else{
      this.getProductById(index).subscribe((res)=>{
        this.totalPrice=this.totalPrice-Math.ceil(res.price * this.quantities[index])
      })
    }
 }
 clearCart() {
  this.items = [];
  this.totalPrice=0
  this.quantities=[]
  return this.items,this.quantities;
}
  updateProductCarQuantity(productId: number, cartQuantity: number):Observable<any>{
  try{
    const params=new HttpParams().set('quantity',cartQuantity.toString())
     // patch ==> api لان دة موجود داخل ال 
    return this.http.patch(`${this.cartUrl}/${productId}`,null,{params})
  }catch(err){
   this.errorHandler.handleError(err)
  }
  }
  viewProductDetails(product:Product){
    this.router.navigate(['/product',product.id])
    }
}
