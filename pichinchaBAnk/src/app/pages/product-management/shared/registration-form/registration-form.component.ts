import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Componente para el formulario de registro de productos.
 */
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  /** Formulario de registro */
  registrationForm!: FormGroup;

  /** ID del producto */
  productId!: string;

  constructor(
    private productListSvc: ProductApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Suscripción a los parámetros de la ruta
    this.route.params.subscribe((params) => {
      this.productId = params['id'] as string;
      if (this.productId) {
        this.getProductDetails(this.productId.toString());
      }
    });

    // Inicialización del formulario de registro
    this.registrationForm = new FormGroup({
      id: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl(null, Validators.required),
      date_release: new FormControl(null, [Validators.required]),
      date_revision: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * Getter para el campo ID del formulario.
   * @returns Control de formulario para el campo ID.
   */
  get id() {
    return this.registrationForm.get('id');
  }

  /**
   * Getter para el campo name del formulario.
   * @returns Control de formulario para el campo name.
   */
  get name() {
    return this.registrationForm.get('name');
  }

  /**
   * Getter para el campo description del formulario.
   * @returns Control de formulario para el campo description.
   */
  get description() {
    return this.registrationForm.get('description');
  }

  /**
   * Getter para el campo logo del formulario.
   * @returns Control de formulario para el campo logo.
   */
  get logo() {
    return this.registrationForm.get('logo');
  }

  /**
   * Getter para el campo date_release del formulario.
   * @returns Control de formulario para el campo date_release.
   */
  get date_release() {
    return this.registrationForm.get('date_release');
  }

  /**
   * Getter para el campo date_revision del formulario.
   * @returns Control de formulario para el campo date_revision.
   */
  get date_revision() {
    return this.registrationForm.get('date_revision');
  }

  /**
   * Obtiene los detalles de un producto.
   * @param productId ID del producto.
   */
  getProductDetails(productId: string): void {
    // Llamada al servicio para obtener la lista completa de productos
    this.productListSvc.getProducts().subscribe(
      (products: Product[]) => {
        // Buscar el producto con el ID correspondiente en la lista
        const product = products.find((p) => p.id === productId);

        if (product) {
          // Si se encuentra el producto, llenar el formulario con sus detalles
          this.registrationForm.patchValue(product);
        } else {
          console.error('Producto no encontrado');
        }
      },
      (error) =>
        console.error(
          'Ocurrió un error al obtener la lista de productos:',
          error
        )
    );
  }

  /**
   * Maneja el envio de datos a actualizar o registrar del formulario.
   */
  onSubmit(): void {
    this.productListSvc.verify('asda');
    if (this.productId) {
      this.productListSvc
        .updateProduct(this.registrationForm.value)
        .subscribe(
          (product: Product) => {
            alert('Producto actualizado correctamente');
            this.router.navigate(['/products']);
          },
          (error) => console.error('An error occurred:', error)
        );
    } else {
      this.productListSvc.postProduct(this.registrationForm.value).subscribe(
        (product: Product) => {
          alert('Producto agregado correctamente');
          this.router.navigate(['/products']);
        },
        (error) => console.error('An error occurred:', error)
      );
    }
  }
}
