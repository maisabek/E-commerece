import { Component,OnInit } from '@angular/core'
import { AuthService } from './services/auth/auth.service'
import {Category} from '../app/models/category'
import {CategoryService} from './services/category/category.service'
import {ProductService} from './services/product/product.service'
import { TranslateService } from '@ngx-translate/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ecommerece'
  categories:Category[]
  constructor(public authService:AuthService,
    private categoryService:CategoryService,
    public ProductService:ProductService,public translate:TranslateService){
    authService.prepareUserData()
    this.prepareCategories()
    this.currentLang=localStorage.getItem('currentLang') || 'en'
    this.ProductService.color=localStorage.getItem('currentColor') 
    this.translate.use(this.currentLang)
    this.authService.username=localStorage.getItem("token") 

  }
  prepareCategories(){
   this.categoryService.getCategories().subscribe((resData)=>{
    this.categories=resData
   })
  }
  ngOnInit(){
  this.authService.prepareUserData()
  this.prepareCategories()
  this.translate.onLangChange.subscribe(()=>{
    console.log(this.translate)
  })
  }  
  currentColor:string
   changecolor(id:string){
   this.ProductService.color=id;
   localStorage.setItem("currentColor",this.ProductService.color)
    }
    currentLang:string
    changeCurrentLang(lang:string){
      this.translate.use(lang)
      localStorage.setItem('currentLang',lang)
    }
}
