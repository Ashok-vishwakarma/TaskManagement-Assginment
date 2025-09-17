import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard',
        loadComponent: () => import('./main/component/dashboard/dashboard').then(m => m.Dashboard),
        // children: []
    },
    {
        path: 'addDetails',
        loadComponent: () => import('./main/pages/add/add').then(m => m.Add)
    }

];
