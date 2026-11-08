import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'app-recent-tasks',
  imports: [],
  templateUrl: './recent-tasks.html',
  styleUrl: './recent-tasks.css',
})
export class RecentTasks {
  private tasksService= inject(TasksService);
  readonly tasks=signal<TaskModel[]>(this.tasksService.allTasks);
  
}
