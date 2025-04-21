import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) {}

  shouldShowLayout(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }
  get userName(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user ? user.full_name : null;
  }
  
}
