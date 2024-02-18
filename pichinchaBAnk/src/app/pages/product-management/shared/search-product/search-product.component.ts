import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * Componente para la búsqueda de productos.
 */
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  /** Evento emitido al realizar una búsqueda */
  @Output() search = new EventEmitter<string>();

  /** Término de búsqueda */
  searchTerm: string = '';

  /**
   * Maneja el evento de búsqueda.
   */
  onSearch(): void {
    // Emite el término de búsqueda
    this.search.emit(this.searchTerm.trim());
  }

  /**
   * Navega a la página de registro de productos.
   */
  onButtonClick(): void {
    this.router.navigate(['products/registration']);
  }

  /**
   * Constructor del componente.
   * @param router Instancia del enrutador de Angular.
   */
  constructor(
    private router: Router,
    private toastr: ToastrService
    ) { }

  /**
   * Método del ciclo de vida de Angular: ngOnInit.
   * Se ejecuta después de que Angular haya inicializado todas las directivas del componente.
   */
  ngOnInit(): void {
  }

}
