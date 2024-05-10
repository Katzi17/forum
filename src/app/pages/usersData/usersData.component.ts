import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-usersData',
  templateUrl: './usersData.component.html',
  styleUrls: ['./usersData.component.scss'],
})
export class UsersDataComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: string): void {
    if (
      confirm(
        'Biztosan el szeretnéd venni ennek a felhasználónak a kommentelési lehetőségét?'
      )
    ) {
      this.userService
        .delete(userId)
        .then(() => {
          console.log('Felhasználó sikeresen törölve.');
        })
        .catch((error) => {
          console.error('Hiba történt a felhasználó törlése közben:', error);
        });
    }
  }

  setUserAdmin(userId: string): void {
    if (confirm('Biztosan adminná szeretnéd tenni ezt a felhasználót?')) {
      this.userService
        .setUserAdmin(userId)
        .then(() => {
          console.log('Felhasználó sikeresen adminná tettve.');
        })
        .catch((error) => {
          console.error(
            'Hiba történt a felhasználó adminná tétel közben:',
            error
          );
        });
    }
  }
}
