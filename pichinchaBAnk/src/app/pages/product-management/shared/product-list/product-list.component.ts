import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductApiService } from '../../services/product-api.service';
import { take, catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedValue: number;
  displayedProducts: Product[];
  filteredProducts: Product[];
  currentIndex: number;
  isModalOpen: boolean = false;
  selectedProductTitle: string = '';
  activeDropdown: Product | null = null;

  constructor(private productListSvc: ProductApiService, private router: Router) {
    this.products = [];
    this.selectedValue = 5;
    this.displayedProducts = [];
    this.filteredProducts = [];
    this.currentIndex = 0;
  }

  ngOnInit(): void {
    this.getProductList();
  }

  onValueChange(event: Event) {
    this.updateDisplayedProducts();
  }

  onSearch(term: string) {
    if (term.trim() === '') {
      this.displayedProducts = [...this.products.slice(0, this.selectedValue)];
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase())
      );
      this.displayedProducts = [
        ...this.filteredProducts.slice(0, this.selectedValue),
      ];
    }
  }

  private getProductList(): void {
    this.productListSvc
      .getProducts()
      .pipe(take(1), catchError(this.handleError))
      .subscribe(
        (productList: Product[]) => {
          this.products = productList;
          this.updateDisplayedProducts();
        },
        (error) => console.error('An error occurred:', error)
      );
  }

  private updateDisplayedProducts(): void {
    this.displayedProducts = this.products.slice(this.currentIndex, this.currentIndex + this.selectedValue);
  }

  showPrevious() {
    if (this.currentIndex - this.selectedValue >= 0) {
      this.currentIndex -= this.selectedValue;
      this.updateDisplayedProducts();
    }
  }
  
  showNext() {
    if (this.currentIndex + this.selectedValue < this.products.length) {
      this.currentIndex += this.selectedValue;
      this.updateDisplayedProducts();
    }
  }

  toggleDropdown(product: Product) {
    if (this.activeDropdown) {
      this.activeDropdown.showDropdown = false;
    }

    product.showDropdown = !product.showDropdown;
    this.activeDropdown = product.showDropdown ? product : null;
  }

  editProduct(product: Product) {
    console.log(JSON.stringify(product));
    this.router.navigate(['products/registration', product.id]);
  }

//modals
openModal(product: Product) {
  this.selectedProductTitle = product.name;
  this.isModalOpen = true;
}


  closeModal() {
    this.isModalOpen = false;
  }

  deleteProduct() {
    this.closeModal();
  }

  // Función para manejar errores
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

}
