import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<any> {
    try {
      const cred = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return cred;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
      this.router.navigateByUrl('/');
    } catch (error) {
      throw error;
    }
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  setUser(user: User) {
    this.currentUser = user;
  }

  getUser(): User | any {
    return this.currentUser;
  }
}
