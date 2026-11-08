import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: TaskModel[] = [
  {
    id: 1,
    title: 'Realizzare homepage',
    project: 'Restyling sito web',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-11-08'
  },
  {
    id: 2,
    title: 'Configurare database',
    project: 'App gestione clienti',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-11-10'
  },
  {
    id: 3,
    title: 'Creare pagina login',
    project: 'App gestione clienti',
    priority: 'high',
    status: 'completed',
    dueDate: '2026-11-05'
  },
  {
    id: 4,
    title: 'Preparare contenuti social',
    project: 'Campagna marketing',
    priority: 'low',
    status: 'in-progress',
    dueDate: '2026-11-12'
  },
  {
    id: 5,
    title: 'Testare autenticazione',
    project: 'App gestione clienti',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-11-15'
  },
  {
    id: 6,
    title: 'Ottimizzare responsive',
    project: 'Restyling sito web',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-11-06'
  }
];

get allTasks(){
  return this.tasks;
}
}
