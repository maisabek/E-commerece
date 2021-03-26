import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal'
import { ProductService } from 'src/app/services/product/product.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   buildForm:FormGroup
   showPass=true
   modalRef:BsModalRef; // dialog عشان يطلع 
   @ViewChild('dialog',{static:false}) dialog:TemplateRef<any>
  constructor(private authService:AuthService,private fb:FormBuilder,
              private router:Router,private cartService:CartService,
              private alertService:AlertService,private modalService:BsModalService,
              public ProductService:ProductService,public translate:TranslateService
             ){
              console.log("this.authService.username",this.authService.username)
             }
  ngOnInit(){
    this.buildForm=this.fb.group({
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    })
  }
  flag:boolean=false
  userLogin(){
   const data=this.buildForm.value
    this.authService.getUsers().subscribe((result)=>{
      for(const res of (result as any)){
      if(data.username == res.username &&
         data.password == res.password){
       this.flag= true
       this.authService.currentUser=res
       this.authService.username=res.username
       break
      }else{
       this.flag= false
       continue
      }}
      if(this.flag  == true){
      this.router.navigate(['/product'])
      localStorage.setItem("token",this.authService.username)
      console.log(this.authService.currentUser)
      }else if(data.username=="admin"&& data.password == "admin"){
        this.router.navigate(['/manageCategories'])
      }else{
        this.alertService.error('error')
        this.openModel(this.dialog)
      }
     })
    // this.authService.login(this.buildForm.value).subscribe(res =>{
    //   localStorage.setItem('token',res.accessToken)
    //   console.log('data',res)
    //   this.authService.prepareUserData()
    //   this.authService.getUsers().subscribe(userData =>{
    //     this.authService.currentUser=userData
    //     console.log('data',userData)
    //   })
    //   this.router.navigate(['/home'])
    // },error =>{
    //   this.alertService.error(error)
    //   this.openModel(this.dialog)
    // })
  }
  openModel(template:TemplateRef<any>){
   this.modalRef=this.modalService.show(template)
  }
  hide():void{
    this.modalRef.hide()
  }
}
