import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DataTablesModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css',
})
export class ListTaskComponent implements OnInit {
  id!: string;
  tasks!: any[];
  dtOptions: Config = {};
  user!: any;

  constructor(
    private taskService: TaskService,
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
    this.taskService.getTasks().subscribe(
      (res: any) => {
        console.log(res);
        this.tasks = res;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  deleteTaskConfirmation(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTask(id);
      }
    });
  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
        // this.toastr.success('To-do deleted');
        // Swal.fire('Task deleted');
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
