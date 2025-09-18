import { Routes } from '@angular/router';
import { Edit } from './main/pages/edit/edit';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard',
        loadComponent: () => import('./main/component/dashboard/dashboard').then(m => m.Dashboard),
    },

    {
        path: 'edit/:id',
        loadComponent: () => import('./main/pages/edit/edit').then(m => m.Edit)
    },


    {
        path: 'addDetails',
        loadComponent: () => import('./main/pages/add/add').then(m => m.Add)
    }

];
