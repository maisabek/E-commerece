import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/porduct';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ProductService} from 'src/app/services/product/product.service'
import { OrderService } from 'src/app/services/order/order.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
   cart:Cart
   cartData:any
   productData:Product[]
   cartItem:CartItem
   modalRef:BsModalRef
   checkoutDto:FormGroup
   createOrderDto:FormGroup
   createPaymentDto:FormGroup
   selectedPaymentMethod=""
   comment:string
   dataSource:MatTableDataSource<Product[]>
    @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator
    @ViewChild(MatSort,{static:true}) sort:MatSort
  
   displayedColumns: string[]=[
    'Number','Name','Price','quantity','actions'
   ]
  constructor(private cartService:CartService,private router:Router,
    public authService:AuthService,private activatedRoute:ActivatedRoute,
    private dialog:MatDialog,private modalService:BsModalService,
    private fb:FormBuilder,private matSnackBar:MatSnackBar,
    public ProductService:ProductService,private orderService:OrderService,
    public translate:TranslateService){
      console.log("productService.quantity",ProductService.quantity)
      console.log("this.ProductService.Product : ",this.ProductService.Product)
      // this.insertIntoCart()
       this.prepareCartData()
       this.getProducts()
    }
  get paymentMethod(){
    return this.checkoutDto.get('createPaymentDto').get(' payment_method')
  }
  get comments(){
    return this.checkoutDto.get('createOrderDto').get('comments')
  }
  ngOnInit(){
    this.prepareCartData()
    console.log("this.cartData.id : ",this.cartData.cart.id)
    this.getProducts()
    this.checkoutDto=this.fb.group({
       createPaymentDto:this.fb.group({
         payment_method:new FormControl(null,Validators.required)
       }),
       createOrderDto:this.fb.group({
        comments: new FormControl(null, Validators.required)
       })
    })
  }
  getProducts(){
    const cartId=this.activatedRoute.snapshot.data.cart
     for(let i of cartId){
     for(let product of i.products ){
     console.log('pro',product.productId)
     this.ProductService.getProducts().subscribe((res)=>{
      console.log("res",res)
      this.productData=res
     })
     }
     }
  }
  product:Product
  // insertIntoCart(){
  //   this.ProductService.insertToCart(this.product.id,this.product.quantity)
    
  // }
  prepareCartData(){
    // if(this.authService.isLoggedIn()){
      if(this.authService.cart && this.authService.cartItem){
       this.cart=this.authService.cart
       this.cartItem=this.authService.cartItem
       const products=this.cartItem.products
      //  this.dataSource=new MatTableDataSource<any>(products)
      //  this.dataSource.sort=this.sort
      //  this.dataSource.paginator=this.paginator
      }else if(this.activatedRoute.snapshot.data.cart){
        console.log('this.activatedRoute.snapshot.data.cart',
        this.activatedRoute.snapshot.data.cart)
        this.cart=this.activatedRoute.snapshot.data.cart
        this.activatedRoute.data.subscribe((res)=>{
          this.cartData=res
        
          // this.dataSource=new MatTableDataSource<any>(products)
          // this.dataSource.sort=this.sort
          // this.dataSource.paginator=this.paginator
        })
      
        } 
      // }
    }
    refreshCartData(){
      if(this.cartItem){
        this.cartService.getCartItem(this.cartItem.productId).subscribe(res =>{
          this.cartItem=res
          this.openSnackBar('cart refresh successfully','ok')
        })
      }
    }
    openDialog(template:TemplateRef<any>){
      this.dialog.open(template)
    }
    hideDialog(){
      this.dialog.closeAll()
    }
    openModal(template:TemplateRef<any>){
      this.modalRef=this.modalService.show(template)
    }
    hideModal(){
      this.modalRef.hide()
    }
    openSnackBar(message:string,action:string){
      this.matSnackBar.open(message,action,{duration:2000})
    }
    checkSelectedMethod(){
      if(this.selectedPaymentMethod === 'VISA' || this.selectedPaymentMethod === 'PAYPAL' ||
      this.selectedPaymentMethod === 'CASH_ON_DELIVERY' || this.selectedPaymentMethod === 'MASTERCARD'){
        return true
      }
      else{
        return false
      }
    }
    removeFormCart(productId:number){
      const array=this.cartItem.products
      this.cartService.removeFromCart(this.cartItem.productId,productId).subscribe((res)=>{
       this.cartItem=res
       this.openSnackBar('remove successfully','ok')
      },(error:Error)=>{
        this.openSnackBar(`an error has occure ${error.message}`,'ok')
      })
    }
    complateCheckOut(){
      this.cartService.checkOut(this.cart.id,this.checkoutDto.value).subscribe((res)=>{
        this.router.navigate(['/order'])
      },(error:Error)=>{
        this.openSnackBar(`an error has occure ${error.message}`,'ok')
      })
    }
    clearCartProducts(){
     this.cartService.clearCartProduct(this.cart.id).subscribe((res)=>{
       this.cart=res
       this.openSnackBar('cart cleared successfull','ok')
     })
    }
    updateProductQuantity(index:number,Quantity:number){
     this.ProductService.quantities[index]=Quantity
     this.openSnackBar('product updated successfull','ok')

    }
    pushToOrders(productId:number,comment:string){
    this.ProductService.getProductById(productId).subscribe((res)=>{
     this.orderService.insertToOrder(res)
    })
  
  
    this.ProductService.pushComments(comment)

    this.openSnackBar('order Send Successfully','ok')
    }
  }

