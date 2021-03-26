import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from 'src/app/models/porduct';
import { ProductService } from 'src/app/services/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  category:Category
  categoryName:any
  quantity:number
  constructor(private categoryService:CategoryService,private snackbar:MatSnackBar,
    private activatedRout:ActivatedRoute,private dialog:MatDialog,public translate:TranslateService,
    private router: Router,public productService:ProductService) { 
      // this.categoryName=this.activatedRout.snapshot.paramMap.get('name')
    this.getGategories()
  }
  ngOnInit() {
    // this.getGategories()
  }
  getGategories(){
    this.activatedRout.paramMap.subscribe((params) => {
      if (params.get('name')) {
        this.categoryService.getCategoryByName(params.get('name'))
          .subscribe(res => {
            this.category = res;
            this.categoryName=params.get('name')
          })
      } else {
        this.router.navigate(['/category']);
      }
    })
  }
  viewProductDetails(product:Product){
  this.productService.viewProductDetails(product)
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
}
