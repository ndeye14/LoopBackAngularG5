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
  currentIdProduct!: any
  search!: any;

  constructor(private produit: ProduitsService, private route: Router) { }
  ngOnInit(): void {
    this.produit.getProduits().subscribe(response => {
      this.produits = response;
      this.saveProduct = response;
      console.log(this.produits);
    });
  }

  addProduct() {
    const newProduct = {
      libelle: this.libelle,
      quantite: this.quantite,
      etat: this.etat
    }
    this.produit.postProduit(newProduct).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
      }
    )
  }
  deleteProduct(id: any) {
    this.produit.deleteProduit(id).subscribe(
      response => {
        console.log(`Suppression de ${response.libelle} reussie !`);
      })
    window.location.reload();
  }

  productModel(id: any) {
    this.produits.forEach(element => {
      if (element.id == id) {
        this.currentIdProduct = element.id;
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
    this.produit.putProduit(id, newProduct).subscribe(
      response => {
        console.log(`modification reussi : ${response}`);
        window.location.reload()
      }
    )
  }
  
  searchProduct(): void {
    this.produits = this.saveProduct;
    this.produits = this.saveProduct.filter(
      (ele) => ele.libelle.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
