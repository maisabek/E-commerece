import { Component, OnInit, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal"
import { AuthService } from 'src/app/services/auth/auth.service'
import {ActivatedRoute} from '@angular/router'
import { Profile } from 'src/app/models/profile';
import { FileUploader } from 'ng2-file-upload';
import { ProductService } from 'src/app/services/product/product.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile:Profile
  modalRef:BsModalRef
  public uploader:FileUploader=new FileUploader({})
  formData:FormData=new FormData()
  selectedFile:string=null // عشان اعرف منها اسم الفايل اللى حملتة
  constructor(private authService:AuthService,private modalService:BsModalService,
              private activatedRoute:ActivatedRoute,public ProductService:ProductService,
              public translate:TranslateService){
    if(this.activatedRoute.snapshot.data.profile){
      this.profile=this.activatedRoute.snapshot.data.profile
      console.log("profile",this.profile)
      this.updateObject.firstname=this.profile.username
      this.updateObject.email=this.profile.email
      this.updateObject.phone=this.profile.phone
      this.updateObject.city=this.profile.address.city
      this.updateObject.street=this.profile.address.street
      this.updateObject.zipcode=this.profile.address.zipcode
    }
  }
  ngOnInit(){}
  updateObject={
    firstname:null,
    email:null,
    phone:null,
    city:null,
    street:null,
    zipcode:null
  }
openModal(template:TemplateRef<any>){
 this.modalRef=this.modalService.show(template)
}

hide(){
  this.modalRef.hide()
}

updateProfile(){
  this.authService.updateProfile(this.updateObject).subscribe(result =>{
   this.profile=result
   this.authService.username=`${result.username}`
  })
}
uploadingNewPicture(){
this.authService.addProfileImage(this.formData).subscribe((res)=>{
this.profile=res
this.formData.delete('image')
this.selectedFile=null
alert('profile image uploaded successfully')
})
}

onFileSelect(event){
if(event.target.files.length > 0){ //يعنى لو عندك صورة
const file=event.target.files[0] as File //يعنى رجع اول صورة
this.selectedFile=file.name
this.formData.set('image',file)
}
}

changingExistPicture() {
  this.authService.changeProfileImage(this.formData)
    .subscribe(res => {
      this.profile = res;
      this.formData.delete('image');
      this.selectedFile = null;
      alert('profile image changed successfully');
    });
}
}
