import { Component, OnInit } from '@angular/core';
import { Product } from './interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Componente para la gestión de productos.
 */
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  /** Lista de productos */
  products!: Product[];

  /** Término de búsqueda */
  searchTerm: string = '';

  /**
   * Constructor del componente.
   * @param router Instancia del enrutador de Angular.
   * @param route Instancia de la ruta activada actualmente.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  /**
   * Método del ciclo de vida de Angular: ngOnInit.
   * Se ejecuta después de que Angular haya inicializado todas las directivas del componente.
   */
  ngOnInit(): void {

  }
}
