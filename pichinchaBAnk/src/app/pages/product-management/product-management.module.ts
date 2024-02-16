import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';
import { ProductListComponent } from './shared/product-list/product-list.component';
import { SearchProductComponent } from './shared/search-product/search-product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductListComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule
  ]
})
export class ProductManagementModule { }
