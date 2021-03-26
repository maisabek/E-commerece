import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/porduct';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:Product
  quantity:number
  constructor(private activatedRoute:ActivatedRoute,public translate:TranslateService,
    public productService:ProductService,private dialog:MatDialog,
    private snackbar:MatSnackBar,public authService:AuthService) {
    activatedRoute.paramMap.subscribe((data)=>{
      if(data.get('id')){
       productService.getProductById(+data.get('id')).subscribe((res)=>{
          this.product=res
       })
      }
    })
   }
   openDialog(template:TemplateRef<any>){
    this.dialog.open(template)
  }
  hideDialog(){
    this.dialog.closeAll()
  }
  ngOnInit() {
  }
  pushToCart(productId:number,quantity:number){
        this.productService.getProductById(productId).subscribe((res)=>{
          this.productService.insertToCart(res)
          console.log(res.price)
          this.productService.totalPrice+=Math.ceil(res.price * quantity)
          console.log('this.productService.totalPrice', this.productService.totalPrice)
        })
        this.productService.addQuantites(quantity)
        this.hideDialog()
  }
  openSnackBar(message:string,action:string){
    this.snackbar.open(message,action,{duration:2000})
  }
}
