import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  /**
   * Constructor del componente.
   * @param productListSvc Servicio para operaciones relacionadas con productos.
   * @param router Servicio para la navegación entre rutas.
   * @param route Servicio para obtener información sobre la ruta activa.
   * @param toastr Servicio para mostrar notificaciones Toastr.
   */
  constructor(
    private productListSvc: ProductApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  /**
   * Método de inicialización del componente.
   * Suscribe a los parámetros de la ruta y establece el formulario de registro.
   */
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
      date_revision: new FormControl(null),
    });

    // Suscribirse a los cambios en la fecha de liberación para calcular la fecha de revisión
    this.registrationForm.get('date_release')!.valueChanges.subscribe(() => {
      this.calculateRevisionDate();
    });
  }

  /**
   * Método para calcular la fecha de revisión.
   */
  calculateRevisionDate(): void {
    const releaseDate = this.registrationForm.get('date_release')!.value;
    if (releaseDate) {
      const newRevisionDate = new Date(releaseDate);
      newRevisionDate.setFullYear(newRevisionDate.getFullYear() + 1);
      this.registrationForm.get('date_revision')!.setValue(newRevisionDate.toISOString().split('T')[0]);
    }
  }

  /**
   * Verifica si el formulario está en modo edición.
   * @returns Verdadero si el formulario está en modo edición, falso de lo contrario.
   */
  isEditMode(): boolean {
    return !!this.productId;
  }

  /**
   * Verifica si el formulario está en modo edición de la fecha.
   * @returns Verdadero siempre, ya que el formulario está siempre en modo edición de la fecha.
   */
  isEditModeDate(): boolean {
    return true;
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
    this.productListSvc.getProducts().subscribe(
      (products: Product[]) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
          this.registrationForm.patchValue(product);
        } else {
          this.toastr.error('Producto no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
        this.toastr.error('Ocurrió un error al obtener la lista de productos');
      }
    );
  }

  /**
   * Maneja el envío de datos a actualizar o registrar del formulario.
   */
  onSubmit(): void {
    if (this.productId) {
      this.productListSvc.updateProduct(this.registrationForm.value).subscribe(
        (product: Product) => {
          this.toastr.success('Producto actualizado correctamente');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
          this.toastr.error('Ocurrió un error al actualizar el producto');
        }
      );
    } else {
      this.productListSvc.postProduct(this.registrationForm.value).subscribe(
        (product: Product) => {
          this.toastr.success('Producto agregado correctamente');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
          this.toastr.error('Ocurrió un error al agregar el producto');
        }
      );
    }
  }
}
