import { Routes } from '@angular/router';
import { StorageComponent } from './storage/storage.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'storage',
        component: StorageComponent
    }
];
