import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductApiService } from '../../services/product-api.service';
import { take, catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Componente para mostrar una lista de productos.
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  // Propiedades
  products: Product[];
  selectedValue: number;
  displayedProducts: Product[];
  filteredProducts: Product[];
  currentIndex: number;
  isModalOpen: boolean = false;
  selectedProductTitle: string = '';
  activeDropdown: Product | null = null;

  // Constructor
  constructor(
    private productListSvc: ProductApiService,
    private router: Router
  ) {
    this.products = [];
    this.selectedValue = 5;
    this.displayedProducts = [];
    this.filteredProducts = [];
    this.currentIndex = 0;
  }

  // Ciclo de vida: OnInit
  ngOnInit(): void {
    this.getProductList();
  }

  // Evento: Cambio de valor en el selector de cantidad
  /**
   * Maneja el evento de cambio de valor en el selector de cantidad.
   * @param event El evento de cambio.
   */
  onValueChange(event: Event) {
    this.updateDisplayedProducts();
  }

  // Evento: Búsqueda
  /**
   * Maneja el evento de búsqueda.
   * @param term El término de búsqueda.
   */
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

  // Método privado: Obtener lista de productos
  /**
   * Obtiene la lista de productos desde el servicio.
   */
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

  // Método privado: Actualizar productos mostrados
  /**
   * Actualiza los productos mostrados en la vista.
   */
  private updateDisplayedProducts(): void {
    this.displayedProducts = this.products.slice(
      this.currentIndex,
      this.currentIndex + this.selectedValue
    );
  }

  // Método: Mostrar productos anteriores
  /**
   * Muestra los productos anteriores en la lista.
   */
  showPrevious() {
    if (this.currentIndex - this.selectedValue >= 0) {
      this.currentIndex -= this.selectedValue;
      this.updateDisplayedProducts();
    }
  }

  // Método: Mostrar productos siguientes
  /**
   * Muestra los productos siguientes en la lista.
   */
  showNext() {
    if (this.currentIndex + this.selectedValue < this.products.length) {
      this.currentIndex += this.selectedValue;
      this.updateDisplayedProducts();
    }
  }

  // Método: Alternar menú desplegable
  /**
   * Alterna la visibilidad del menú desplegable para un producto dado.
   * @param product El producto para el cual se desea alternar el menú desplegable.
   */
  toggleDropdown(product: Product) {
    if (this.activeDropdown) {
      this.activeDropdown.showDropdown = false;
    }

    product.showDropdown = !product.showDropdown;
    this.activeDropdown = product.showDropdown ? product : null;
  }

  // Método: Editar producto
  /**
   * Navega a la página de edición de un producto.
   * @param product El producto que se desea editar.
   */
  editProduct(product: Product) {
    this.router.navigate(['products', 'registration', product.id]);
  }

  // Método: Abrir modal
  /**
   * Abre un modal para mostrar detalles de un producto.
   * @param product El producto del cual se mostrarán los detalles.
   */
  openModal(product: Product) {
    this.selectedProductTitle = product.name;
    this.isModalOpen = true;
  }

  // Método: Cerrar modal
  /**
   * Cierra el modal.
   */
  closeModal() {
    this.isModalOpen = false;
  }

  // Método: Eliminar producto
  /**
   * Elimina un producto.
   */
  deleteProduct() {
    if (this.activeDropdown) {
      this.productListSvc
        .deleteProduct(this.activeDropdown.id)
        .pipe(
          take(1),
          catchError((error) => this.handleError(error))
        )
        .subscribe(
          () => {
            this.getProductList();
            this.closeModal();
            alert("Product eliminado correctamente");
            window.location.reload();
          },
          (error) => console.error('An error occurred:', error)
        );
    }
  }

  // Método privado: Manejar errores
  /**
   * Maneja los errores de la aplicación.
   * @param error El error que se ha producido.
   * @returns Un observable con el error.
   */
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
