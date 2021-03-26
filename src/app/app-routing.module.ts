import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderService } from './services/order/order.service';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ProfileResolveService } from './resolvers/profile.service';
import { CartResolverService } from './resolvers/cart.resolver.service';
import { ProductResolveService } from './resolvers/product.service';
import { CategoryResolverService } from './resolvers/category.service';
import { UserAuthGuard } from './guards/user-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { ContactComponent } from './components/contact/contact.component';
import { ResourceNotFoundComponent } from './shared/resource-not-found/resource-not-found.component';
import { ApplicationErrorComponent } from './shared/application-error/application-error.component';
import { ManageCategoriesComponent } from './admin/components/manage-categories/manage-categories.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';


const routes: Routes = [
  {path:'',redirectTo:'product',pathMatch:'full'},
  // {path:'home',component:HomeComponent},
  {
   path:'profile',component:ProfileComponent,
   resolve:{profile:ProfileResolveService},
  //  canActivate:[UserAuthGuard]
  }
  ,
  { 
    path:'order',component:OrderComponent,
    // canActivate:[UserAuthGuard],
    resolve:{cart:CartResolverService}
  },
  {
    path:'contact',component:ContactComponent
  },
  {
   path:'cart',component:CartComponent,
   resolve:{cart:CartResolverService}
  },
  {
    path:'auth',children:[
   {path:'login',component:LoginComponent},
   {path:'register',component:RegisterComponent},
   ]
  },
  {
   path:'product',component:ProductListComponent,
   resolve:{products:ProductResolveService},
  //  canActivate:[UserAuthGuard]
  },
  {path:'dashboard',component:DashboardComponent},
  {path:'product/:id',component:ProductDetailsComponent},
  {
    path:'category',component:CategoryListComponent,
    resolve:{category:CategoryResolverService}
  },
  {path:'category/:name',component:CategoryDetailsComponent},
  
    {
      path:'manageCategories',component:ManageCategoriesComponent,
      resolve:{category:CategoryResolverService}
    },
  //lazy loading: this module will not loaded only if the user navigate into it
  {path:'admin',
  // canActivate:[AdminAuthGuard],
  loadChildren: ()=> import('./admin/admin.module').then(a => a.AdminModule)
  },
  {path:'resourceNotFound/:status',component:ResourceNotFoundComponent},
  {path:'applicationError/:status',component:ApplicationErrorComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
