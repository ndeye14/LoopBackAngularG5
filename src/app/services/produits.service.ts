import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produits`);
  }

  getProduitById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produits/${id}`);
  }

  postProduit(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/produits`, productData);
  }

  createProduit(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }
  deleteProduit(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/produits/${id}`)
  }

  putProduit(id: any, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/produits/${id}`, product)
  }
}