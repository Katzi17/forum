import { Component, model } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  currentUser: User | null = null;

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        this.userService.getUsernameById(userId).subscribe((username) => {
          this.currentUser = {
            id: userId,
            email: user.email || '',
            username: username,
            isAdmin: false,
          };
        });
      } else {
        this.currentUser = null;
      }
    });
  }
}
