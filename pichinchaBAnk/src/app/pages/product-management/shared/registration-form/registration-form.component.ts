import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'id': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        // Aquí debes agregar la validación personalizada para verificar la unicidad del ID
      ]),
      'nombre': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      'descripcion': new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      'logo': new FormControl(null, Validators.required),
      'fecha_liberacion': new FormControl(null, [
        Validators.required,
        // Aquí debes agregar la validación personalizada para verificar que la fecha sea igual o mayor a la fecha actual
      ]),
      'fecha_revision': new FormControl(null, [
        Validators.required,
        // Aquí debes agregar la validación personalizada para verificar que la fecha sea exactamente un año después de la fecha de liberación
      ])
    });
  }

  get id() {
    return this.registrationForm.get('id');
  }

  get nombre() {
    return this.registrationForm.get('nombre');
  }

  get descripcion() {
    return this.registrationForm.get('descripcion');
  }

  get logo() {
    return this.registrationForm.get('logo');
  }

  get fecha_liberacion() {
    return this.registrationForm.get('fecha_liberacion');
  }

  get fecha_revision() {
    return this.registrationForm.get('fecha_revision');
  }

  onSubmit() {
    console.log(this.registrationForm);
  }

}
