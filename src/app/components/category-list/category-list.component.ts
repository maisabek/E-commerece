import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import {Category} from '../../models/category'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories:Category[]
  @Input() inputCategories:Category[]
  constructor(private route:ActivatedRoute,private router:Router,
    private category:CategoryService,public translate:TranslateService) {
      if(this.route.snapshot.data.category){
        this.categories=this.route.snapshot.data.category
      }
      console.log("categories",this.categories)
     }

  ngOnInit() {}
  viewCategoryDetails(category:Category){
    console.log("category",category)
    this.router.navigate(['/category',category])

  }

}
