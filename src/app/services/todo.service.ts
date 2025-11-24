import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // private baseUrl = 'http://localhost:8389/api/todo';
  private baseUrl = 'https://todo-1-q2kf.onrender.com/api/todo';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTasks(tasks: Task[]): Observable<Task[]> {
    return this.http.post<Task[]>(this.baseUrl, tasks);
  }

  updateTask(task: Task, id: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
