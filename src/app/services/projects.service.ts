import { inject, Injectable } from '@angular/core';
import { NewProjectModel, ProjectModel } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class ProjectService {

  private http= inject(HttpClient);

  getProjects() {
    return this.http.get<ProjectModel[]>('http://localhost:3000/projects').pipe(
      map( (projects)=> projects.map((p)=>({
        ...p,
        completion: p.completion ?? 0
      })).filter(p => p.status === 'in-progress')));
  }

  createProject( newProject: NewProjectModel): Observable<ProjectModel> {
    const np= this.http.post<ProjectModel>('http://localhost:3000/projects', newProject);
    return np;

  }

  
}
  