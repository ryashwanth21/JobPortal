import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authService.setUserLoggedIn(); // ✅ trigger login state
        this.snackBar.open('✅ Login successful', 'Close', { duration: 2000 });
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('❌ Login failed. Please check your credentials.', 'Close', { duration: 3000 });
      }
    });
  }
}
