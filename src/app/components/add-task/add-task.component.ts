import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  addTask!: FormGroup;

  constructor(
    private fbt: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addTask = this.fbt.group({
      title: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  get title() {
    return this.addTask.controls['title'];
  }
  get description() {
    return this.addTask.controls['description'];
  }

  onSubmit() {
    this.taskService.addTask(this.addTask.value).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/task-list');
        Swal.fire('New Task Added!');
      },
      (error: Error) => {
        console.log(error);
      }
    );
    this.addTask.reset();
  }
}
