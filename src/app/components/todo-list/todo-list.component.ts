import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DataTablesModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoComponent implements OnInit {
  id!: string;
  todos!: any[];
  dtOptions: Config = {};
  user!: any;

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.fetchToDo();
    this.user = this.userService.user;
  }

  fetchToDo() {
    this.todoService.getToDos().subscribe(
      (res: any) => {
        console.log(res);
        this.todos = res;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  deleteTask(id: string) {
    this.todoService.deleteToDos(id).subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
        // this.toastr.success('To-do deleted');
        Swal.fire('Task deleted');
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
