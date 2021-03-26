import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/porduct';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  categoriesNameUrl:any='https://fakestoreapi.com/products/categories'
  categoryUrl:any='https://fakestoreapi.com/products/category'
  productUrl:any='https://fakestoreapi.com/products'

  constructor(private http: HttpClient){}

  private errorHandler: ErrorHandler = new ErrorHandler();

  getCategories(): Observable<Category[]> {
    try {
      return this.http.get<Category[]>(`${this.categoriesNameUrl}`);
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  getCategoryByName(categoryName: string): Observable<Category> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${categoryName}`;
      return this.http.get<Category>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  createCategory(createCategoryDto: any): Observable<Category> {
    try {
      return this.http.post<Category>(`assets/data/categoriesName.json`, createCategoryDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  updateCategory(categoryName: string, updateCategoryDto): Observable<void> {
    try {
      const urlById = `${this.categoryUrl}/${categoryName}`;
      return this.http.put<void>(urlById, updateCategoryDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
  updateProduct(
    categoryName: string,
    productId: number,
    updateProductDto: any
  ): Observable<void> {
    try {
      const urlById = `${this.productUrl}/${categoryName}`;
      return this.http.put<void>(urlById, updateProductDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  deleteCategory(categoryName: string): Observable<any> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${categoryName}`;
      return this.http.delete<void>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCategoryProducts(id: number): Observable<Product[]> {
    try {
      return this.http.get<Product[]>(`${this.categoriesNameUrl}`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  deleteProduct(categoryName: string, productId: number) {
    try {
      const urlById = `${this.categoryUrl}/${categoryName}`;
      return this.http.delete<void>(urlById);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  addProduct(createProductDto: any): Observable<void> {
    try {
      // const urlById = `${this.categoryUrl}/${categoryId}/products`;
      return this.http.post<void>(`assets/data/products.json`, createProductDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

}
