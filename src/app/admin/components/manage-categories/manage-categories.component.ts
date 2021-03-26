import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar'
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product/product.service';
import { FileUploader } from 'ng2-file-upload';
import { Product } from 'src/app/models/porduct';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {
  category: Category;
  createCategoryDto: FormGroup;
  categoryTypes = ["electronics","jewelery","men clothing","women clothing"]
  modalRef: BsModalRef;
  selectedCategory = "";
  createProductDto: FormGroup;
  updateCategoryDto: FormGroup;
  updateProductDto: FormGroup;


  
  public uploader: FileUploader = new FileUploader({});
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    public productService: ProductService,
    private _snackBar: MatSnackBar,public translate:TranslateService
  ) {
    this.categories = this.route.snapshot.data.category;
    console.log("this.categories",this.categories)

  }

  ngOnInit() {
    this.createCategoryDto = this.fb.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required)
    });
    this.createProductDto = this.fb.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required)
    });
    this.updateCategoryDto = this.fb.group({
      name: new FormControl(""),
      description: new FormControl(""),
      type: new FormControl({
        value: "",
        disabled: true
      })
    });
  }
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }
  openModel(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template)
   }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  hide(): void {
    this.dialog.closeAll();
  }
  prepareProductForm(product: Product) {
    this.updateProductDto = this.fb.group({
      name: new FormControl(product.title),
      description: new FormControl(product.description),
      quantity: new FormControl(product.quantity),
      price: new FormControl(product.price),
      image: new FormControl(null)
    });
  }

  selectedFile: string;
  productCreationFormData: FormData = new FormData();
  productUpdatingFormData: FormData = new FormData();
  onUploadingFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedFile = file.name;
      this.createProductDto.value.image = file;
      this.productCreationFormData.append("image", file);
    }
  }
  updateSelectedFile: string;
  onChangingFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.updateSelectedFile = file.name;
      this.updateProductDto.value.image = file;
      this.productUpdatingFormData.append("image", file);
    }
  }
  products:Product[]
  getProducts(){
    this.productService.getProducts().subscribe(res =>{
      this.products=res
    })
  }
  addProduct(){
    this.productCreationFormData.append("title",this.createProductDto.value.title);
    this.productCreationFormData.append("description",this.createProductDto.value.description);
    this.productCreationFormData.append("price",this.createProductDto.value.price);
    this.productCreationFormData.append("quantity",this.createProductDto.value.quantity);
    this.categoryService.addProduct(this.productCreationFormData).subscribe((res)=>{
      this.openSnackBar(`Product Was added successfully ${this.category.name}`,'ok')
    })
    this.createProductDto.reset()
   this.clearFormData()
   this.selectedFile=null
   this.categoryService.getCategoryByName(this.category.name).subscribe((res)=>{
     this.category=res
   })
  }
  clearFormData(){
    this.productCreationFormData.delete('title')
    this.productCreationFormData.delete('description')
    this.productCreationFormData.delete('price')
    this.productCreationFormData.delete('quantity')

  }
  updateProduct(CategoryName: string, productId: number, product: Product) {
    this.productUpdatingFormData.append(
      "name",
      this.updateProductDto.value.name
    );
    this.productUpdatingFormData.append(
      "description",
      this.updateProductDto.value.description
    );
    this.productUpdatingFormData.append(
      "price",
      this.updateProductDto.value.price
    );
    this.productUpdatingFormData.append(
      "quantity",
      this.updateProductDto.value.quantity
    );
    this.categoryService
      .updateProduct( CategoryName,productId, this.productUpdatingFormData)
      .subscribe(
        res => {
          this.openSnackBar("product was updated successfully", "OK");
          this.deleteUpdateProductFormContentData();
          this.updateSelectedFile = null;
          this.productService.getProductById(productId).subscribe(
            resProd => {
              product = resProd;
            },
            err => {
              console.error(err);
            }
          );
        },
        err => {
          console.error(err);
        }
      );
  }
  deleteUpdateProductFormContentData(): void {
    this.updateProductDto.reset();
    this.productUpdatingFormData.delete("name");
    this.productUpdatingFormData.delete("description");
    this.productUpdatingFormData.delete("price");
    this.productUpdatingFormData.delete("quantity");
    this.productUpdatingFormData.delete("image");
  }
  deleteProduct(categoryName: string, productId: number) {
    const products = this.category.products;
    this.categoryService.deleteProduct(categoryName, productId).subscribe(
      res => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === productId) {
            products.splice(i, 1);
            this.openSnackBar("product has been removed successfully", "OK");
          }
        }
      },
      error => {
        this.openSnackBar("An error has occurred", "Cancel");
        console.error(error);
      }
    );
  }
  categoriesData:Category
  getCategories(name:string){
    this.categoryService.getCategoryByName(name).subscribe((res)=>{
     this.categoriesData=res
    })
    return this.categoriesData
  }
  categories: Category[];

  addCategory(){
    this.categoryService.createCategory(this.createCategoryDto.value).subscribe((res)=>{
     this.openSnackBar('category added successfully','ok')
     this.createCategoryDto.reset()
    })
    this.categoryService.getCategories().subscribe((result)=>{
      this.categories=result
    },(error:Error)=>{
      this.openSnackBar(`an error occure ${error.message}`,'cancel')
    })
  }

  preparecategoryForm(product: Product) {
    this.updateProductDto = this.fb.group({
      name: new FormControl(this.category.name),
      description: new FormControl(this.category.description),
      type: new FormControl(this.category.type),

   
    });
  }
  updatecategory(name: any) {
    this.categoryService
      .updateCategory(name, this.updateCategoryDto.value)
      .subscribe(
        res => {
          this.openSnackBar("Category was updated successfully", "OK");
          this.categoryService.getCategoryByName(name).subscribe(
            catRes => {
              this.category = catRes;
            },
            err => {
              console.error(err);
            }
          );
        },
        err => {
          this.openSnackBar("An error has occurred", "Cancel");
          console.error(err);
        }
      );
  }
  deleteCategory(index: number) {
    this.categoryTypes.splice(index, 1);

    // this.categoryService.deleteCategory(categoryName).subscribe(
    //   res => {
    //     for (let i = 0; i < this.categories.length; i++) {
    //       if (this.categories[i].name === categoryName) {
    //         this.categories.splice(i, 1);
    //         this.openSnackBar("Category has been removed successfully", "OK");
    //       }
    //     }
    //   },
    //   err => {
    //     this.openSnackBar("An error has occurred", "Cancel");
    //     console.error(err);
    //   }
    // );

  }



  
}
