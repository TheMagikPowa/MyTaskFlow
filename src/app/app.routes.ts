import { Routes } from '@angular/router';
import { NewProject } from './pages/dashboard/new-project/new-project';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProjectsPage } from './pages/projects/projects-page/projects-page';

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
        path: 'projects',
        component: ProjectsPage
    }
];
