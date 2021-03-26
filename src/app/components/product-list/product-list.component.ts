import { Component, OnInit, TemplateRef,Input } from '@angular/core';
import {Product} from '../../models/porduct'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  products:Product[]
  searchTerm:string
  quantity:number
  constructor(private route:ActivatedRoute,private router:Router,
    public authService:AuthService,public productService:ProductService,
     private snackbar:MatSnackBar,private dialog:MatDialog,public translate:TranslateService
    ) { 
    if(this.route.snapshot.data.products){
      this.products=this.route.snapshot.data.products
    }
  }

  ngOnInit(){}
  productDetails(product:Product){
   this.router.navigate(['/product',product.id],{
     queryParams:{name:product.title}
   })
  }
   product:Product
  pushToCart(productId:number,quantity:number){
        this.productService.getProductById(productId).subscribe((res)=>{
          this.productService.insertToCart(res)
          console.log(res.price)
          this.productService.totalPrice+=Math.ceil(res.price * quantity)
          console.log('this.productService.totalPrice', this.productService.totalPrice)
        })
        this.productService.addQuantites(quantity)
        this.hideDialog()
      // }
  }
  openDialog(template:TemplateRef<any>){
    this.dialog.open(template)
  }
  hideDialog(){
    this.dialog.closeAll()
  }
 
  openSnackBar(message:string,action:string){
    this.snackbar.open(message,action,{duration:2000})
  }
  viewProductDetails(product:Product){
    this.productService.viewProductDetails(product)
    }
}
