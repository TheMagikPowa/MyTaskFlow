import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProjectModel } from '../../../models/project.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../services/projects.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-project',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.css',
})
export class EditProject implements OnInit {

  private projectService= inject(ProjectService);
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private destroy= inject(DestroyRef)
  private cdr = inject(ChangeDetectorRef);

  loading= signal(true);
  error= signal<string| null>(null);
  success= signal(false);

  id= this.route.snapshot.paramMap.get('id');

  editedProj: ProjectModel = {
    id: this.id ?? '',
    name: '',
    description: '',
    status: 'in-progress',
    completion: 0,
    totalTasks: 0,
    completedTasks: 0
  }

  ngOnInit() { 
    this.error.set(null);
    this.loading.set(true);

    if (this.id){
      this.projectService.getProjectById(this.id).pipe(
        takeUntilDestroyed(this.destroy)
      ).subscribe({
        next: (value)=> {
          this.loading.set(false);
          this.editedProj = value;
          this.cdr.detectChanges();

        },
        error: (err)=> {
          this.loading.set(false);
          this.error.set('Errore nel caricamento delle informazioni!')
          console.log(err)
        }
      })
    } else {
      this.loading.set(false);
      this.error.set('Si è verificato un errore nel caricamento delle informazioni')
    }
  }

  onSubmit(form: NgForm) {

    const id = this.id;

    if (!id || form.invalid) {
      return;
    }

    this.error.set(null);
    this.loading.set(true);
    this.success.set(false);

    this.projectService.updateProject(id, this.editedProj).subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set(true);
          setTimeout(()=>{
            this.router.navigateByUrl('/projects');
          }, 2000)
          
        },
        error: (err) => {
          this.error.set('Qualcosa è andato storto nel salvataggio delle modifiche, riprova!');
          this.loading.set(false);
          console.error(err);
        }
      });
    }
}
