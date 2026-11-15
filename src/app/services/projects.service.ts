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

  getAllProjects() {
    return this.http.get<ProjectModel[]>('http://localhost:3000/projects').pipe(
      map(projects=> projects.map(p=> ({...p, completion: p.completion ?? 0}))
      ));
  }

  getProjectById(id: string): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(
      `http://localhost:3000/projects/${id}`
  );
}

  

  createProject( newProject: NewProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>('http://localhost:3000/projects', newProject);

  }

  deleteProject(id:string){
    return this.http.delete(`http://localhost:3000/projects/${id}`);
  }

  updateProject(id : string | null, updatedProject: NewProjectModel) {
    return this.http.put<ProjectModel>(`http://localhost:3000/projects/${id}`, updatedProject)
  }

  
}
  