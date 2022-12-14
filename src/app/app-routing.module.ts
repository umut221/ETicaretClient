import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {path:"admin", component:LayoutComponent, children: [
    {path:"customers", loadChildren: () => import("./admin/components/customer/customer.module").then(module => module.CustomerModule),canActivate:[AuthGuard]},
    {path:"products", loadChildren: () => import("./admin/components/products/products.module").then(module=> module.ProductsModule),canActivate:[AuthGuard]},
    {path:"orders", loadChildren: () => import("./admin/components/order/order.module").then(module=> module.OrderModule),canActivate:[AuthGuard]},
    {path:"", component:DashboardComponent,canActivate:[AuthGuard]}, 
  ], canActivate:[AuthGuard]
}, 
  {path:"", component: HomeComponent},
  {path:"basket", loadChildren :() => import("./ui/components/basket/basket.module").then(module => module.BasketModule)},
  {path:"products", loadChildren :() => import("./ui/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"register", loadChildren: () => import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
  {path:"login", loadChildren: () => import("./ui/components/login/login.module").then(module=>module.LoginModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
