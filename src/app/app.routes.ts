import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo-list/todo-list.component';
import { authGuard } from './auth.guard';
import { EditToDoComponent } from './components/edit-todo/edit-todo.component';
import { LoginComponent } from './components/login/login.component';
import { ViewTasksComponent } from './components/view-todo/view-todo.component';
import { RegisterComponent } from './components/register/register.component';
import { AddToDoComponent } from './components/add-todo/add-todo.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'todo',
    component: TodoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-todo',
    component: AddToDoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-todo/:id',
    component: EditToDoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'view-task/:id',
    component: ViewTasksComponent,
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
