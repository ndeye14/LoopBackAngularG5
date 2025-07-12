import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produit`);
  }

  getProduitById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produit/${id}`);
  }
  
  postProduit(productData: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/produit`, productData, {
      observe: 'response'
    });
  }

  createProduit(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData)
  }
  deleteProduit(id: any): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.apiUrl}/produit/${id}`, {
      observe: 'response'
    })
  }

  putProduit(id: any, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/produit/${id}`, product)
  }
}