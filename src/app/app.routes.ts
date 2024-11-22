import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'task-list',
    component: ListTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-task/:id',
    component: EditTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'view-task/:id',
    component: ViewTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
