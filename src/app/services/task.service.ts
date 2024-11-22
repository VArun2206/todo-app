import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getTasks() {
    let url = `${this.apiURL}/todos`;
    return this.http.get(url);
  }

  addTask(task: any) {
    let url = `${this.apiURL}/todos`;
    return this.http.post(url, task);
  }

  updateTask(id: string, task: any) {
    let url = `${this.apiURL}/todos/${id}`;
    return this.http.patch(url, task);
  }

  deleteTask(id: string) {
    let url = `${this.apiURL}/todos/${id}`;
    return this.http.delete(url);
  }

  getTask(id: string) {
    let url = `${this.apiURL}/todos/${id}`;
    return this.http.get(url);
  }
}
