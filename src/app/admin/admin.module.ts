import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { AdminroutingModule } from './adminrouting.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    
    
  ],
  imports: [
    CommonModule,
    AdminroutingModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    }),
  ]
})
export class AdminModule { }
export function createTranslateLoader(http:HttpClient){
  //.json ==> extension يتاعة الفايلات 
return new TranslateHttpLoader(http,'./assets/i18n/','.json')
}
