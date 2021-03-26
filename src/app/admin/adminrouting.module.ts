import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { CategoryResolverService } from '../resolvers/category.service';
import { UserResolverService } from '../resolvers/user.service';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
const routes:Routes=[
{path:'',
// canActivate:[AdminAuthGuard],
children:[
  {path:'dashboard',component:DashboardComponent}
    
]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AdminroutingModule { }
