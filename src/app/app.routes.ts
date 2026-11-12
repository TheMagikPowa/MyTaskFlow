import { Routes } from '@angular/router';
import { NewProject } from './pages/projects/new-project/new-project';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProjectsPage } from './pages/projects/projects-page/projects-page';
import { EditProject } from './pages/projects/edit-project/edit-project';
import { TasksPage } from './pages/tasks/tasks-page/tasks-page';
import { EditTask } from './pages/tasks/edit-task/edit-task';
import { AddTask } from './pages/tasks/add-task/add-task';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard
    },
    
    {
        path: 'projects/new',
        component: NewProject
    },

    {
        path: 'projects/edit/:id',
        component: EditProject
    },

    {
        path: 'projects',
        component: ProjectsPage
    },
    {
        path: 'tasks',
        component: TasksPage
    },
    {
        path: 'tasks/edit/:id',
        component: EditTask
    },
    {
        path: 'tasks/new',
        component: AddTask
    }
];
