import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo-list/todo-list.component';
import { authGuard } from './auth.guard';
import { EditToDoComponent } from './components/edit-todo/edit-todo.component';
import { LoginComponent } from './components/login/login.component';
import { ViewTasksComponent } from './components/view-todo/view-todo.component';
import { RegisterComponent } from './components/register/register.component';
import { AddToDOComponent } from './components/add-todo/add-todo.component';

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
    path: 'addToDO',
    component: AddToDOComponent,
    canActivate: [authGuard],
  },
  {
    path: 'editToDo/:id',
    component: EditToDoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'viewTaks/:id',
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
];
