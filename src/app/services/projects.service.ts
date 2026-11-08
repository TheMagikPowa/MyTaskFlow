import { inject, Injectable } from '@angular/core';
import { ProjectModel } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class ProjectService {

  private http= inject(HttpClient);

  getProjects() {
    return this.http.get<ProjectModel[]>('/api/projects').pipe(
      map( (projects)=> projects.map((p)=>({
        ...p,
        completion: p.completion ?? 0
      })).filter(p => p.status === 'in-progress')));
  }

  
}
  