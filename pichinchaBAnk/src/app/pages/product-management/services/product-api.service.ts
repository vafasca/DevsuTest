import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private apiURI!: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiURI = 'https://my-json-server.typicode.com/vafasca/bp/products';
   }

   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURI);
  }
}
