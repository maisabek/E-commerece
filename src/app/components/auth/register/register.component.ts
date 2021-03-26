import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm:FormGroup
  constructor(private fb:FormBuilder,private authService:AuthService,
              private router:Router,public ProductService:ProductService,public translate:TranslateService){
  if(this.authService.isLoggedIn()){
      this.router.navigate([`/home`])
  }
  }
  ngOnInit() {
    this.registrationForm=this.fb.group({
      authDto:new FormGroup({
        username:new FormControl(null,Validators.required),
        password:new FormControl(null,Validators.required)
      }),
      createProfileDto:new FormGroup({
        firstname:new FormControl(null,Validators.required),
        lastname:new FormControl(null,Validators.required),
        email:new FormControl(null,[Validators.required,Validators.email]),
        gender:new FormControl(null,Validators.required),
        age:new FormControl(null,Validators.required),
        country:new FormControl(null,Validators.required),
        city:new FormControl(null,Validators.required),
        address:new FormControl(null,Validators.required),
        phone:new FormControl(null,Validators.required)
      })
    })
  }
  get username(){
    return this.registrationForm.get('authDto').get('username')
  }
  get password(){
    return this.registrationForm.get('authDto').get('password')
  }
  register(){
    const user={
      username:this.username.value,
      password:this.password.value
    }
    // this.authService.register(this.registrationForm.value).subscribe(
    // ()=>{
    //  this.authService.login(user).subscribe(resToken =>{
    //   localStorage.setItem("token", resToken.accessToken)
    //   this.authService.prepareUserData()
    //   this.authService.getUsers().subscribe(
    //     resUser => {
    //       this.authService.currentUser = resUser
    //     }
    //   );
     
    //  },
    //  error => console.log(error)
    //  )
    // })
  }
}


