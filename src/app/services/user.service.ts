import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal<any | null>(null);

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {
    this.user.set(this.getUserFromLocalStorage());
  }

  getUsers() {
    let url = `${this.apiURL}/users`;
    const res = this.http.get(url);
    return firstValueFrom(res);
  }

  addUser(user: any) {
    let url = `${this.apiURL}/users`;
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
