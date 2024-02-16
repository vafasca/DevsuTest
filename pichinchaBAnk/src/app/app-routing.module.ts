import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'x', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/product-management/product-management.module').then(
        (m) => m.ProductManagementModule
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
