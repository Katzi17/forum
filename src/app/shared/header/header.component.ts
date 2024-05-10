import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Routes } from '@angular/router';
import { ForumComponent } from '../../pages/forum/forum.component';
import { QuestionsComponent } from '../../pages/questions/questions.component';
import { HomeComponent } from '../../pages/home/home.component';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  panelColor = new FormControl('red');

  route: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'forum', component: ForumComponent },
  ];

  currentUser: User | null = null;
  userEmail: string | null = null;

  ngOnInit() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const userEmail = user.email;
        this.userService
          .isAdmin(userId)
          .then((userIsAdmin) => {
            this.currentUser = {
              id: userId,
              username: '',
              email: userEmail ?? '',
              isAdmin: userIsAdmin,
            };
          })
          .catch((error) => {
            console.error(
              'Hiba történt az adminisztrátori jogosultság ellenőrzésekor:',
              error
            );
          });
      } else {
        this.currentUser = null;
      }
    });
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loggedInUser?: firebase.default.User | null;

  logout() {
    this.authService.logout();
  }
}
