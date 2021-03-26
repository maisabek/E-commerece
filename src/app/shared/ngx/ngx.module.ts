import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { ModalModule } from 'ngx-bootstrap/modal'
import { NgxFontAwesomeModule } from 'ngx-font-awesome';

const ngxComponent=[
  NgxFontAwesomeModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngxComponent
  ],
  exports:[
    ngxComponent
  ]
})
export class NgxModule { }
