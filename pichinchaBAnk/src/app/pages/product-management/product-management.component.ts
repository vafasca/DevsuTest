import { Component, OnInit } from '@angular/core';
import { Product } from './interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products!: Product[];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.searchTerm = params['term'] || '';
    //   this.onSearch(this.searchTerm);
  }

  // onSearch(searchTerm: string) {
  //   if (searchTerm) {
  //     this.router.navigate([], {
  //       relativeTo: this.route,
  //       queryParams: { term: searchTerm },
  //       queryParamsHandling: 'merge',
  //     });
  //   }
  
  //   this.itemSvc
  //     .getProducts()
  //     .pipe(
  //       tap((itemList: Product[]) => {
  //         if (searchTerm) {
  //           let filteredItems = itemList.filter(
  //             (product) =>
  //             product.nombre.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
  //             product.descripcion.toString().includes(searchTerm)
  //           );
  //           // Si filteredItems está vacío, asigna todos los elementos a la propiedad items
  //           if (filteredItems.length === 0) {
  //             this.products = itemList;
  //           } else {
  //             this.products = filteredItems;
  //           }
  //         } else {
  //           // Si searchTerm está vacío, asigna todos los elementos a la propiedad items
  //           this.products = itemList;
  //         }
  //       })
  //     )
  //     .subscribe();
  // }

}
