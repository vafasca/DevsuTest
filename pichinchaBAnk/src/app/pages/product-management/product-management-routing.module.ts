import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './product-management.component';
import { RegistrationFormComponent } from './shared/registration-form/registration-form.component';

const routes: Routes = [
{ path: '', component: ProductManagementComponent },
{ path: 'registration', component: RegistrationFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
