import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal<any | null>(null);

  login_URL = environment.login_URL;

  constructor(private http: HttpClient) {
    this.user.set(this.getUserFromLocalStorage());
  }

  getAllUsers() {
    let url = `${this.login_URL}`;
    const res = this.http.get(url);
    return firstValueFrom(res);
  }

  addUser(user: any) {
    let url = `${this.login_URL}`;
    return firstValueFrom(this.http.post(url, user));
  }

  getUserFromLocalStorage() {
    let res = localStorage.getItem('user');
    if (res) {
      let user = JSON.parse(res);
      return user;
    } else {
      return null;
    }
  }
}
