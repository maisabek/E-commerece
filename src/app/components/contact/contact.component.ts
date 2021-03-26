import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  CreateContactDto:FormGroup
  constructor(private authService: AuthService,private fb: FormBuilder,
    private snackBar: MatSnackBar,private dialog: MatDialog,
    public ProductService:ProductService,public translate:TranslateService) {}

  ngOnInit() {
    this.CreateContactDto=this.fb.group({
      name:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      title:new FormControl('',Validators.required),
      message:new FormControl('',Validators.required)
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000})
  }
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }
  onSubmit(template:TemplateRef<any>){
    this.authService.messageContact(this.CreateContactDto.value).
    subscribe((res)=>{
     this.openSnackBar('message sent successfully','ok')
     this.openDialog(template)
    })
  }



}
