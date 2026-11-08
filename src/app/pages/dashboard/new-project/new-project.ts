import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewProjectModel } from '../../../models/project.model';

@Component({
  selector: 'app-new-project',
  imports: [FormsModule],
  templateUrl: './new-project.html',
  styleUrl: './new-project.css',
})
export class NewProject {

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

  onSubmit() {

  }

}
