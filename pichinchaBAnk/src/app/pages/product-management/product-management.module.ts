import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';
import { ProductListComponent } from './shared/product-list/product-list.component';


@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule
  ]
})
export class ProductManagementModule { }
