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
    this.apiURI = 'http://localhost:3000/products';
    //http://localhost:3000/products
  }

  public getPath(): string {
    return '/products';
  }

  getUrl(): string {
    return `http://localhost:3000${this.getPath()}`;
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.getUrl());
  }

  public getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURI}/${id}`);
  }

  public postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.getUrl(), product);
  }

  public deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.getUrl()+`/${id}`);
  }

  public updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(this.getUrl()+`/${id}`, product);
  }
}
