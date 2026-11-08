import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../services/projects.service';

@Component({
  selector: 'app-projects-page',
  imports: [],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {

  private projectsService=inject(ProjectService);

  getProjects() {
    return this.projectsService.getAllProjects().subscribe();
  }
}
