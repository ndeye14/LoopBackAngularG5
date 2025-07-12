import { Component } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Router } from '@angular/router';
import { find } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  produits!: any[];
  saveProduct!: any[];
  libelle!: any;
  quantite!: any;
  etat: boolean = true;
  currentProductLibelle!: any;
  currentProductQuantite!: any;
  currentIdProduct!: any;
  search!: any;
  closeModal!: string;

  constructor(private produit: ProduitsService, private route: Router) { }
  ngOnInit(): void {
    this.getProduits();
  }
  
  getProduits() {
    this.produit.getProduits().subscribe(response => {
      this.produits = response;
      this.saveProduct = response;
      console.log(this.produits);
    });
  }

  resetField() {
    this.libelle = '';
    this.quantite = '';
  }

  addProduct() {
    const newProduct = {
      libelle: this.libelle,
      quantite: this.quantite,
      etat: this.etat
    }
    this.produit.postProduit(newProduct).subscribe({
      next: (response) => {
        if (response.status === 201) {
          console.log(response.body.produit);
          this.produits.push(response.body.produit);
          this.resetField();
        }
      },
      error: (error) => {
        console.error('Erreur :', error);
      },
      complete: () => {
        console.log('Ajout du produit terminé.');
      }
    });
  }
  deleteProduct(id: any) {
    this.produit.deleteProduit(id).subscribe({
      next: response => {
        console.log(response.body.message);
        console.log(response);
        this.produits = this.produits.filter(p => p._id !== id);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  productModel(id: any) {
    this.produits.forEach(element => {
      if (element._id == id) {
        this.currentIdProduct = element._id;
        this.currentProductLibelle = element.libelle;
        this.currentProductQuantite = element.quantite;
      }
    });
  }

  putProduct(id: any) {
    const newProduct = {
      libelle: this.currentProductLibelle,
      quantite: this.currentProductQuantite,
      etat: this.etat
    }
    this.produit.putProduit(id, newProduct).subscribe({
      next: response => {
        console.log(response);
        this.produits[id] = { ...newProduct };
        console.log(this.produits[id]);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
  searchProduct(): void {
    this.produits = this.saveProduct;
    this.produits = this.saveProduct.filter(
      (ele) => ele.libelle.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
