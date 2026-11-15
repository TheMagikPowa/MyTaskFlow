import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { TaskModel } from '../../../models/task.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../services/projects.service';
import { ProjectModel } from '../../../models/project.model';

@Component({
  selector: 'app-recent-tasks',
  imports: [],
  templateUrl: './recent-tasks.html',
  styleUrl: './recent-tasks.css',
})
export class RecentTasks implements OnInit {

  private tasksService= inject(TasksService);
  private projectService= inject(ProjectService);
  private destroy= inject(DestroyRef);

  allProjects= signal<ProjectModel[]>([])
  loading= signal(true);
  error= signal<string | null>(null);
  allTasks= signal<TaskModel[]>([]);
  
  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
  }

  loadTasks() {
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

  loadProjects() {
  return this.projectService.getAllProjects().pipe(
    takeUntilDestroyed(this.destroy)
  ).subscribe({
    next: (projects) => {
      this.allProjects.set(projects);
    },
    error: (err) => {
      console.log(err);
    }
  });
}
  
getProjectName(id: string) {
  const project = this.allProjects().find(
    p => String(p.id) === String(id)
  );

  return project ? project.name : 'Progetto non trovato';
}
}
