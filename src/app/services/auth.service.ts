import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  private userSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  userStatus$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(false);
  }

  setUserLoggedIn(): void {
    this.userSubject.next(true);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
