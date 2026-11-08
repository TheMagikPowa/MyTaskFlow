import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import {ProjectService } from '../../../services/projects.service';
import { ProjectModel } from '../../../models/project.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recent-projects',
  imports: [RouterLink],
  templateUrl: './recent-projects.html',
  styleUrl: './recent-projects.css',
})
export class RecentProjects implements OnInit {
  private projectsService= inject(ProjectService);
  private destroy= inject(DestroyRef);
  loading=signal(true);
  error=signal(false);
  projects= signal<ProjectModel[]>([]);

  ngOnInit(): void {
    this.loadProjects()

  }

  loadProjects() {
  this.loading.set(true);
  this.error.set(false);

  return this.projectsService.getProjects().pipe(
    takeUntilDestroyed(this.destroy)
    ).subscribe({
      next: (value) => {
        this.loading.set(false);
        this.projects.set(value);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(true);
        console.error(err);
      }
    });
  }

}
