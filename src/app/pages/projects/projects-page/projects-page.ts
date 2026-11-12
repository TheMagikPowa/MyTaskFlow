import { Component, computed, DestroyRef, inject, NgModule, OnChanges, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../../services/projects.service';
import { ProjectModel } from '../../../models/project.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-page',
  standalone:true,
  imports: [FormsModule, RouterLink],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage implements OnInit {

  projectInput = signal('');
  statusInput = signal('all');
  loading= signal(true);
  error= signal(false);
  projects = signal<ProjectModel[]>([]);
  filteredProjects = computed(() => {
  const search = this.projectInput().toLowerCase().trim();
  const status = this.statusInput();

  return this.projects().filter(p =>
    p.name.toLowerCase().includes(search)
    && (status === 'all' || p.status === status)
  );
});

  private destroyRef= inject(DestroyRef)
  private projectsService=inject(ProjectService);


  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.loading.set(true);
    this.error.set(false);

    return this.projectsService.getAllProjects().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      {
        next: (value) => {
          this.loading.set(false);
          this.projects.set(value);
        },
        error: (err)=> {
          this.error.set(true);
          this.loading.set(false);
          console.error(err);
        }
        
      }
    );
  }

  deleteProject(id: string) {
    if (!confirm('Sei sicuro di voler eliminare questo progetto?')) {
      return;
    }
    this.projectsService.deleteProject(id).subscribe({
      next: ()=> {
        this.projects.update(projects =>
        projects.filter(p => p.id !== id)
        );
        console.log('Eliminazione avvenuta con successo!');
      },
      error: (err)=> {
        console.log(err);
      }
    })
    
  }

  updateProject(id: string, updatedProject: ProjectModel) {
    this.projectsService.updateProject(id, updatedProject).subscribe({
      
      })
    }
  }


