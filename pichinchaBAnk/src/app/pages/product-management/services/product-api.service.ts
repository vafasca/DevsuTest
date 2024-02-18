import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../interfaces/product.interface';

/**
 * Servicio para interactuar con la API de productos.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiURL: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la URL completa de la API.
   * @returns La URL completa de la API.
   */
  private getFullURL(): string {
    return `${this.apiURL}`;
  }

  /**
   * Obtiene las cabeceras HTTP para las solicitudes.
   * @returns Las cabeceras HTTP con la autorización y el identificador de autor.
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'application/json',
      'authorId': '1'
    });
  }

  /**
   * Obtiene todos los productos.
   * @returns Un observable que emite un array de productos.
   */
  public getProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.getFullURL(), { headers });
  }

  /**
   * Crea un nuevo producto.
   * @param product El producto a crear.
   * @returns Un observable que emite el producto creado.
   */
  public postProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.getFullURL(), product, { headers });
  }

  /**
   * Actualiza un producto existente.
   * @param product El producto actualizado.
   * @returns Un observable que emite el producto actualizado.
   */
  public updateProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.put<Product>(this.getFullURL(), product, { headers });
  }

  /**
   * Elimina un producto por su ID.
   * @param id El ID del producto a eliminar.
   * @returns Un observable que emite la respuesta de la eliminación.
   */
  public deleteProduct(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.getFullURL()}?id=${id}`, { headers, responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (error) {
          return response;
        }
      }),
      catchError(error => {
        throw 'Error al eliminar el producto'; // Manejo de errores mejorado
      })
    );
  }

  /**
   * Verifica la existencia de un producto por su ID.
   * @param id El ID del producto a verificar.
   * @returns Un observable que emite el producto verificado.
   */
  public verify(id: string): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(`${this.getFullURL()}/verification?id=${id}`, { headers });
  }
}
