  import { Component } from '@angular/core';
  import { AuthService } from '../../../services/auth.service';
  import { Router } from '@angular/router';
  import { MatSnackBar } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
  })
  export class RegisterComponent {
    user = {
      full_name: '',
      username: '',
      email: '',
      password: '',
      phone: ''
    };

    constructor(
      private authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar
    ) {}

    register() {
      this.authService.register(this.user).subscribe({
        next: () => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/login']);
        },
        error: () => {
          this.snackBar.open('Registration failed. Try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
