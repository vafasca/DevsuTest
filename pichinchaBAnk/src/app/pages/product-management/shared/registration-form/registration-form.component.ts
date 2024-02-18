import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  productId!: string;

  constructor(
    private productListSvc: ProductApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'] as string;
      if (this.productId) {
        this.getProductDetails(this.productId.toString());
      }
    });

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

  get id() {
    return this.registrationForm.get('id');
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get description() {
    return this.registrationForm.get('description');
  }

  get logo() {
    return this.registrationForm.get('logo');
  }

  get date_release() {
    return this.registrationForm.get('date_release');
  }

  get date_revision() {
    return this.registrationForm.get('date_revision');
  }

  getProductDetails(productId: string) {
    console.log('Ejecutando getProductDetails');
    console.log('ID del producto: ' + productId);

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

  onSubmit() {
    console.log('onSubmit');
    this.productListSvc.verify('asda');
    if (this.productId) {
      this.productListSvc.updateProduct(this.registrationForm.value).subscribe(
        (product: Product) => {
          console.log(product);
          alert('Producto actualizado correctamente');
          this.router.navigate(['/products']);
        },
        (error) => console.error('An error occurred:', error)
      );
    } else {
      this.productListSvc.postProduct(this.registrationForm.value).subscribe(
        (product: Product) => {
          console.log(product);
          alert('Producto agregado correctamente');
          this.router.navigate(['/products']);
        },
        (error) => console.error('An error occurred:', error)
      );
    }
  }
}
