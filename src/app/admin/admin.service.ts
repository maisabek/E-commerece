import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ErrorHandler} from '../shared/error-handler'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  errorHandler=new ErrorHandler()
  constructor(private http:HttpClient) { }
  getSystemUsers():Observable<any>{
    try{
     return this.http.get('')
    }catch(err){
     this.errorHandler.handleError(err)
    }
  }
  getExistingData():Observable<any>{
    try{
      return this.http.get('')
    }catch(err){
      this.errorHandler.handleError(err)
    }
  }
}
