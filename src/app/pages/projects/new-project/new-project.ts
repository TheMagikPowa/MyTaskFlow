import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewProjectModel } from '../../../models/project.model';
import { ProjectService } from '../../../services/projects.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-project',
  imports: [FormsModule, RouterLink],
  templateUrl: './new-project.html',
  styleUrl: './new-project.css',
})
export class NewProject {

  success= signal(false);
  error= signal(false);

  private projectService= inject(ProjectService)
  private router= inject(Router)

  newProject: NewProjectModel = {
    name: '',
    description: '',
    status: 'in-progress',
    completion: 0,
    totalTasks: 0,
    completedTasks: 0
}; 

  isTasksCountValid(): boolean {
    if (this.newProject.completedTasks<=this.newProject.totalTasks){
      return true
    }
    return false;
  }

  onSubmit(form: NgForm) {
    this.success.set(false);
    this.error.set(false);
    if (this.isTasksCountValid() && form.valid) {
      this.projectService.createProject(this.newProject).subscribe({
        next: proj => {
          this.success.set(true);
          this.error.set(false);
          console.log(proj);
          setTimeout(()=> this.router.navigateByUrl("/"), 2000)
          
        },
        error: err=> {
          this.success.set(false);
          this.error.set(true);
          console.error(err)
        }
      });
    }
  }

}
