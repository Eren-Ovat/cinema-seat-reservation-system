import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://reqres.in/api';
  private token!: string;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password }).pipe(
      tap((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { email, password }).pipe(
      tap((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
      })
    );
  }

  logout(): void {
    this.token = "";
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
}
