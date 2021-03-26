import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import { ErrorHandler } from 'src/app/shared/error-handler';
import {Observable} from 'rxjs'
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { UserData } from 'src/app/models/user-data';
import {environment} from '../../../environments/environment'
import { AlertService } from '../alert/alert.service';
@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http:HttpClient,private router:Router,private alertService:AlertService){}
  private errorResponce:ErrorHandler=new ErrorHandler()
  public currentUser:User
  public profile:Profile
  public cart:Cart
  public cartItem:CartItem
  public username:string
  userUrl:any='https://fakestoreapi.com/users'
  paymentMethods:string[]=[
    'VISA',
    'PAYPAL',
    'CASH_ON_DELIVERY',
    'MASTERCARD'
  ]
  allData:any[]
  register(data:any):Observable<any>{
   try{
    return this.http.post(`${this.userUrl}`,data)
   }catch(error){
     this.errorResponce.handleError(error)
   }
  }

  getUsers():Observable<any>{
    try{
     return this.http.get(`https://fakestoreapi.com/users`)
    }catch(error){
      this.errorResponce.handleError(error)
    }
  }
  flag: boolean=false
  f:boolean=false


  userLogout(){
    localStorage.removeItem('token')
    this.username=""
    this.router.navigate(['/auth/login'])
  }
  


  getSystemUser():Observable<User[]>{
    try{
     return this.http.get<any>(`${this.userUrl}`)
    }catch(error){
      this.errorResponce.handleError(error)
    }
  }
  
  getToken(){
    return localStorage.getItem('token')
  }

  // !! ==> boolean عشان ترجع 
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  getUserProfile():Observable<Profile>{
    try{
    return this.http.get<any>(`${this.userUrl}/${this.currentUser.id}`)
    }catch(error){
     this.errorResponce.handleError(error)
    }
  }

  prepareUserData():Observable<UserData>{
    try{
     return this.http.get<any>(`${this.userUrl}`)
    }catch(error){
     this.errorResponce.handleError(error)
    }
  }

  PUserData(){
   if(this.isLoggedIn()){
    this.prepareUserData().subscribe((uData:UserData)=>{
      this.profile=uData.profile
      this.username = `${uData.profile.email} ${uData.profile.lastname}`
      this.cart = uData.cart
      this.cartItem=uData.cartItem
    })
    this.getUsers().subscribe(resUser =>{
      this.currentUser=resUser
    })
   }
  }

  messageContact(messageForm:any):Observable<any>{
   try{
    return this.http.post('',messageForm)
   }catch(error){
     this.errorResponce.handleError(error)
   }
  }
  updateProfile(updateForm): Observable<any> {
    try {
      return this.http.put<Profile>(
        `${this.userUrl}/${this.currentUser.id}`,
        updateForm
      );
    } catch (error) {
      this.errorResponce.handleError(error);
    }
  }
  changeProfileImage(imageForm): Observable<Profile> {
    try {
      return this.http.patch<Profile>(``, imageForm);
    } catch (err) {
      this.errorResponce.handleError(err);
    }
  }

  addProfileImage(imageForm): Observable<Profile> {
    try {
      return this.http.post<Profile>(``, imageForm);
    } catch (err) {
      this.errorResponce.handleError(err);
    }
  }


}
