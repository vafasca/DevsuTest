import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiURI!: string;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'application/json',
      'authorId': '1'
    });
  }
  
  constructor(private http: HttpClient) {
    this.apiURI = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
    //http://localhost:3000/products
  }

  public getPath(): string {
    return '/bp/products';
  }

  getUrl(): string {
    return `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros${this.getPath()}`;
  }

  public getProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.apiURI, { headers });
  }

  //no funciona, corregir
  public getProduct(id: string): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(`${this.apiURI}/${id}`, { headers });
  }

  public postProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.apiURI, product, { headers });
  }

  public updateProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.put<Product>(this.apiURI, product, { headers });
  }

  // public deleteProduct(id: string): Observable<Product> {
  //   const headers = this.getHeaders();
  //   return this.http.delete<Product>(`${this.apiURI}?id=${id}`, { headers });
  // }
  public deleteProduct(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiURI}?id=${id}`, { headers, responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (error) {
          return response;
        }
      })
    );
  }

  //add method get without id
  public verify(id: string): Observable<Product> {
    const headers = this.getHeaders();
    console.log("se esta ejecutando verify"+id)
    return this.http.get<Product>(`${this.apiURI}/verification?id=${id}`, { headers });
  }

}
