import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: CustomerComponent}
    ])
  ]
})
export class CustomerModule { }
