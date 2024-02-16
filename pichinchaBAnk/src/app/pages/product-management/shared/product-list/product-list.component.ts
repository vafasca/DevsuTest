import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // Product apiFake
  public productList: Product[] = [
    {
        "id": "trj-crd1",
        "nombre": "Tarjetas de Credito 1",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 1",
        "logo": "url_del_logo_1",
        "fechaLiberacion": "2023-03-01T00:00:00.000+00:00",
        "fechaRevision": "2024-03-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd2",
        "nombre": "Tarjetas de Credito 2",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 2",
        "logo": "url_del_logo_2",
        "fechaLiberacion": "2023-04-01T00:00:00.000+00:00",
        "fechaRevision": "2024-04-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd3",
        "nombre": "Tarjetas de Credito 3",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 3",
        "logo": "url_del_logo_3",
        "fechaLiberacion": "2023-05-01T00:00:00.000+00:00",
        "fechaRevision": "2024-05-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd4",
        "nombre": "Tarjetas de Credito 4",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 4",
        "logo": "url_del_logo_4",
        "fechaLiberacion": "2023-06-01T00:00:00.000+00:00",
        "fechaRevision": "2024-06-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd5",
        "nombre": "Tarjetas de Credito 5",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 5",
        "logo": "url_del_logo_5",
        "fechaLiberacion": "2023-07-01T00:00:00.000+00:00",
        "fechaRevision": "2024-07-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd6",
        "nombre": "Tarjetas de Credito 6",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 6",
        "logo": "url_del_logo_6",
        "fechaLiberacion": "2023-08-01T00:00:00.000+00:00",
        "fechaRevision": "2024-08-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd7",
        "nombre": "Tarjetas de Credito 7",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 7",
        "logo": "url_del_logo_7",
        "fechaLiberacion": "2023-09-01T00:00:00.000+00:00",
        "fechaRevision": "2024-09-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd8",
        "nombre": "Tarjetas de Credito 8",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 8",
        "logo": "url_del_logo_8",
        "fechaLiberacion": "2023-10-01T00:00:00.000+00:00",
        "fechaRevision": "2024-10-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd9",
        "nombre": "Tarjetas de Credito 9",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 9",
        "logo": "url_del_logo_9",
        "fechaLiberacion": "2023-11-01T00:00:00.000+00:00",
        "fechaRevision": "2024-11-01T00:00:00.000+00:00"
    },
    {
        "id": "trj-crd10",
        "nombre": "Tarjetas de Credito 10",
        "descripcion": "Tarjeta de consumo bajo la modalidad de credito 10",
        "logo": "url_del_logo_10",
        "fechaLiberacion": "2023-12-01T00:00:00.000+00:00",
        "fechaRevision": "2024-12-01T00:00:00.000+00:00"
    }
]


  constructor() { }

  ngOnInit(): void {
  }

}
