import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewTaskModel, TaskModel } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../services/projects.service';
import { ProjectModel } from '../../../models/project.model';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask implements OnInit {

  private tasksService= inject(TasksService);
  private route = inject(ActivatedRoute);
  private destroy= inject(DestroyRef);
  private router= inject(Router);
  private projectService= inject(ProjectService);

  prevTask= signal<TaskModel| null>(null);
  loading= signal(true);
  message= signal<string|null>(null);
  error= signal<string|null>(null);
  allProjects= signal<ProjectModel[]>([]);
  id=this.route.snapshot.paramMap.get('id');


  editTask: NewTaskModel= {
    title: "",
    projectId: "",
    priority: "low",
    status: "in-progress",
    dueDate: ""
  }


  ngOnInit(): void {
    this.getAllProjects();
    this.loadTask();
  }


  onSubmit(form: NgForm){ 
    if (!this.id || form.invalid) {
      return;
    }
    this.tasksService.updateTask(this.id ?? "", this.editTask).pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: ()=> {
        this.loading.set(false);
        this.loading.set(false);
        this.message.set('Modifica avvenuta correttamente!');
        setTimeout(()=>{
          this.router.navigateByUrl('/tasks');
        }, 2000)
      },
      error: (err)=> {
        this.error.set('Errore nel caricamento delle attività');
        console.log(err)
      }
    }) 
  }

  getAllProjects() {
    return this.projectService.getAllProjects().pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: (value)=> {
        this.allProjects.set(value);
      },
      error: (err)=> {
        this.error.set('Errore nel caricamento dei progetti');
        console.log(err);

      }
    })
  }

  loadTask() {
    return this.tasksService.getTaskById(this.id ?? '').pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: (value) => {
        this.prevTask.set(value);
        this.loading.set(false);

        this.editTask = {
          title: value.title,
          projectId: value.projectId,
          priority: value.priority,
          status: value.status,
          dueDate: value.dueDate
        };
      },
      error: (err) => {
        this.error.set('Errore nel recupero dell’attività');
        this.loading.set(false);
        console.log(err);
      }
    });
  }
}