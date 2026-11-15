
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewTaskModel } from '../../../models/task.model';
import { ProjectModel } from '../../../models/project.model';
import { ProjectService } from '../../../services/projects.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask implements OnInit {

  private projectService = inject(ProjectService);
  private destroy = inject(DestroyRef);
  private tasksService = inject(TasksService);
  private router = inject(Router);

  allProjects = signal<ProjectModel[]>([]);

  message = signal<string | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  newTask: NewTaskModel = {
    title: '',
    projectId: '',
    priority: 'low',
    status: 'in-progress',
    dueDate: ''
  };

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    return this.projectService.getAllProjects().pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: (proj) => {
        this.allProjects.set(proj);
      },
      error: (err) => {
        this.error.set('Errore nel caricamento dei progetti');
        console.log(err);
      }
    });
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.message.set(null);
    this.loading.set(true);
    this.error.set(null);

    this.tasksService.createTask(this.newTask).pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: () => {
        this.loading.set(false);
        this.message.set('Nuova task aggiunta al progetto');

        form.resetForm({
          title: '',
          projectId: '',
          priority: 'low',
          status: 'in-progress',
          dueDate: ''
        });

        setTimeout(
          () => this.router.navigateByUrl('/tasks'),
          2000
        );
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Errore nella creazione della task');
        console.log(err);
      }
    });
  }
}

