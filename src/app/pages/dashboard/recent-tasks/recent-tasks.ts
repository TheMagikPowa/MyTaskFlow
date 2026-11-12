import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { TaskModel } from '../../../models/task.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recent-tasks',
  imports: [],
  templateUrl: './recent-tasks.html',
  styleUrl: './recent-tasks.css',
})
export class RecentTasks implements OnInit {

  private tasksService= inject(TasksService);
  private destroy= inject(DestroyRef);

  loading= signal(true);
  error= signal<string | null>(null);
  allTasks= signal<TaskModel[]>([]);
  
  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(){
    this.loading.set(true);
    this.error.set(null);

    return this.tasksService.getAllTasks().pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: (value)=> {
        this.loading.set(false);
        console.log(value);
        this.allTasks.set(value);
      },
      error: (err)=> {
        this.loading.set(false);
        this.error.set("Si è verificato un errore nel caricamento");
        console.log(err);
      }
    })
  }
  
}
