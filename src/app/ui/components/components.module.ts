import { HomeModule } from './home/home.module';
import { BasketModule } from './basket/basket.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BasketModule,
    HomeModule,
    ProductsModule
  ]
})
export class ComponentsModule { }
