import { inject, Injectable } from '@angular/core';
import { NewTaskModel, TaskModel } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private http= inject(HttpClient);

  getAllTasks():  Observable<TaskModel[]>{
    return this.http.get<TaskModel[]>('http://localhost:3000/tasks');
  }

  getTaskById (id: number| string): Observable<TaskModel> {
    return  this.http.get<TaskModel>(`http://localhost:3000/tasks/${id}`) ;

  }

  createTask(task: NewTaskModel) {
    return this.http.post<TaskModel>('http://localhost:3000/tasks', task);
  }

  deleteTask(id: string) {
    return this.http.delete<TaskModel>(`http://localhost:3000/tasks/${id}`);
  }

  updateTask(id:string, task: NewTaskModel) {
    return this.http.put<TaskModel>(`http://localhost:3000/tasks/${id}`, task)
  }
}
