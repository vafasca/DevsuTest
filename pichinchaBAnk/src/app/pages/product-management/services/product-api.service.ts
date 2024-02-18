import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';

/**
 * Servicio para interactuar con la API de productos.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiURL: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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
    return this.http.get<Product[]>(this.getFullURL(), { headers }).pipe(
      catchError(error => {
        throw  this.toastr.error('Error al obtener los productos');
      })
    );
  }


  /**
   * Crea un nuevo producto.
   * @param product El producto a crear.
   * @returns Un observable que emite el producto creado.
   */
  public postProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.getFullURL(), product, { headers }).pipe(
      catchError(error => {
        throw this.toastr.error('Error al agregar el producto');
      })
    );
  }

  /**
   * Actualiza un producto existente.
   * @param product El producto actualizado.
   * @returns Un observable que emite el producto actualizado.
   */
  public updateProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.put<Product>(this.getFullURL(), product, { headers }).pipe(
      catchError(error => {
        throw this.toastr.error('Error al actualizar el producto');
      })
    );
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
        // Analizar la respuesta de texto para determinar el caso
        const jsonResponse = { message: response };
        return jsonResponse;
      }),
      catchError(error => {
        throw this.toastr.error('Error al actualizar el producto');
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
