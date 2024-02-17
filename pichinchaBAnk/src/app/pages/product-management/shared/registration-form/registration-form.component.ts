import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;

  productId!: string;

  constructor(private productListSvc: ProductApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("id"+this.productId);
      this.productId = params['id'] as string;
      console.log("id"+this.productId);
      //this.productId="trj-crd25"
      if (this.productId) {
        this.getProductDetails(this.productId.toString());
      }
    });

    this.registrationForm = new FormGroup({
      'id': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      'description': new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      'logo': new FormControl(null, Validators.required),
      'date_release': new FormControl(null, [
        Validators.required,
      ]),
      'date_revision': new FormControl(null, [
        Validators.required,
      ])
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
    console.log("ejecitasdadasddddano");
    console.log(productId);
    // No es necesario convertir a cadena, productId ya es un número
    this.productListSvc.getProduct(productId.toString()).subscribe(
      (product: Product) => {
        this.registrationForm.patchValue(product); // Llena el formulario con los detalles del producto
      },
      (error) => console.error('An error occurred:', error)
    );
  }


  onSubmit() {
    if (this.productId) {
      this.productListSvc.updateProduct(this.productId.toString(), this.registrationForm.value).subscribe(
        (product: Product) => {
          console.log(product);
          alert("Producto actualizado correctamente");
          this.router.navigate(['/products']);
        },
        (error) => console.error('An error occurred:', error)
      );
    } else {
      this.productListSvc.postProduct(this.registrationForm.value).subscribe(
        (product: Product) => {
          console.log(product);
          alert("Producto agregado correctamente");
          this.router.navigate(['/products']);
        },
        (error) => console.error('An error occurred:', error)
      );
    }
  }
  

}
