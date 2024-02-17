import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductApiService } from '../../services/product-api.service';
import { take, catchError, throwError, Observable  } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Product[];
    selectedValue: number;
    displayedProducts: Product[];
    filteredProducts: Product[];

  constructor(
    private productListSvc: ProductApiService
  ) {
    this.products = [];
    this.selectedValue = 5;
    this.displayedProducts = [];
    this.filteredProducts = [];
   }

  ngOnInit(): void {
    this.getProductList();
  }

  onValueChange(event: Event) {
    console.log(this.selectedValue);
    this.updateDisplayedProducts();
  }
  

  onSearch(term: string) {
    if (term.trim() === '') {
      this.displayedProducts = [...this.products.slice(0, this.selectedValue)];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) || product.description.toLowerCase().includes(term.toLowerCase())
      );
      this.displayedProducts = [...this.filteredProducts.slice(0, this.selectedValue)];
    }
  }
  private getProductList(): void {
    this.productListSvc
      .getProducts()
      .pipe(take(1), catchError(this.handleError))
      .subscribe((productList: Product[]) => {
        this.products = productList;
        this.updateDisplayedProducts();
        console.log(productList);
      }, error => console.error('An error occurred:', error));
  }

  // Función para manejar errores
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  private updateDisplayedProducts(): void {
    this.displayedProducts = this.products.slice(0, this.selectedValue);
  }

}
