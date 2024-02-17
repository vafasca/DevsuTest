import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';
import { ProductListComponent } from './shared/product-list/product-list.component';
import { SearchProductComponent } from './shared/search-product/search-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './shared/registration-form/registration-form.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';


@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductListComponent,
    SearchProductComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductManagementModule { }
