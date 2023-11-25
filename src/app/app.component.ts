import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoopBackAngularG5';
  users!: any[];
  constructor(private user: UsersService) { }

  ngOnInit() {
    this.user.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
