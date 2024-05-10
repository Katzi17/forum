import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  ngOnInit(): void {}
  email = new FormControl();
  password = new FormControl();

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: message },
    });
  }

  async login() {
    if (!this.email.value || !this.password.value) {
      this.openDialog('Üres mező!');
      return;
    } else {
      this.authService
        .login(this.email.value, this.password.value)
        .then((cred) => {
          this.router.navigateByUrl('/home');
        })
        .catch((error) => {
          this.openDialog('Rossz email cím vagy jelszó!');
        });
    }
  }
}
