import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users!: any[];
  email!: string;
  password!: string;

  constructor(private user: UsersService, private route: Router) {}
  ngOnInit(): void {
    this.user.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  // verifierChamps() {
  //   if (!this.email || !this.password) {
  //     Swal.fire({
  //       title: 'error',
  //       text: 'erreur',
  //       icon: 'error'
  //     });
  //   } else if () {
      
  //   }{
      
  //   }
  // }

  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  // Methode ajout contact
  userConnect() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Premiere vérification avec sweetalert 
    if (this.email == "" ||  this.password == "" || !this.email ||  !this.password ) {
      this.verifierChamps("Oops!", "Vueillez renseigner les champs", "warning");
    }

    else if (!this.email.match(emailPattern)) {
      // Vérifie si le format de l'email est correct 
      this.verifierChamps("Erreur!", "Email invalide", "error");
    }
    else {
      // const autth = this.users.find(ele => ele.email == this.email && ele.password == this.password)
      if (this.email == "andredembandione1@gmail.com" && this.password == "P@sser1234!") {
        this.verifierChamps("Succès", "Connexion reussi", "success");
        setTimeout(() => {
          this.route.navigate(['home']);
        }, 1000);
      }
      else {
        this.verifierChamps('Erreur!', "Email ou mot de passe incorrecte!", "error");
      }
    }
  }
}
