import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiURI!: string;

  constructor(private http: HttpClient) {
    this.apiURI = 'https://my-json-server.typicode.com/vafasca/bp/products';
  }

  public getPath(): string {
    return '/vafasca/bp/products';
  }

  getUrl(): string {
    return `https://my-json-server.typicode.com/${this.getPath()}`;
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.getUrl());
  }

  public postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.getUrl(), product);
  }

  public deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`this.getUrl()/${id}`);
  }

  public updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`this.getUrl()/${id}`, product);
  }
}
