import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userList: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get('https://reqres.in/api/users').subscribe((res: any) => {
      this.userList = res.data;
    });
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
