import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { TaskModel } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../services/projects.service';
import { ProjectModel } from '../../../models/project.model';

@Component({
  selector: 'app-tasks-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {

  private tasksService= inject(TasksService);
  private projectService= inject(ProjectService);
  private destroy= inject(DestroyRef);

  tasksInput= signal<string>('');
  selection= signal<'all'| 'in-progress' | 'pending' | 'completed' >('all');

  allProjects= signal<ProjectModel[]>([]);
    projectsById = computed(() => {
    return new Map(
      this.allProjects().map(project => [
        String(project.id),
        project.name
      ])
    );
  });
  loading= signal(true);
  error= signal<string | null>(null);
  deleteError= signal<string | null>(null);
  allTasks= signal<TaskModel[]>([]);
  filteredTasks= computed(()=> {
    const search= this.tasksInput().trim().toLowerCase();
    const status= this.selection()

    return this.allTasks().filter((t)=>
      t.title.toLowerCase().includes(search)
      && (t.status===status || status==='all') )
      

      }
    )
  
  
  
  ngOnInit(): void {
    this.loadTasks();
    this.getAllProjects();
  }

  loadTasks(){
    this.loading.set(true);
    this.error.set(null);

    return this.tasksService.getAllTasks().pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: (value)=> {
        this.loading.set(false);
        this.allTasks.set(value);
      },
      error: (err)=> {
        this.loading.set(false);
        this.error.set("Si è verificato un errore nel caricamento");
        console.log(err);
      }
    })
  }

  deleteTask(id: string) {
    if(!confirm('Sei sicuro di voler eliminare questa task?')){
      return;
    }

    this.deleteError.set(null);

    this.tasksService.deleteTask(id).pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: () => {
        this.allTasks.update((tasks)=> tasks.filter(t => t.id!==id)
    )},
      error: (err)=>{
        this.deleteError.set('Errore nella cancellazione, riprova più tardi!')
        console.log(err)
      }
      
    })
  }

  getAllProjects() {
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

  getProjectName(id: string ): string {
    return this.projectsById().get(String(id)) ?? 'Progetto non trovato';
  }
}

//da creare il form di modifica e di aggiunta
