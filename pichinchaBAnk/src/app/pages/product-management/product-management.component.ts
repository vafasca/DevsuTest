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
    private route: ActivatedRoute,
    // private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    // this.cdr.detectChanges();
    // this.cdr.markforCheck();

  }

}
