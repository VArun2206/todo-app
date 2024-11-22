import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  editTask!: FormGroup;
  id!: string;
  task!: any;

  constructor(
    private fbt: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.editTask = this.fbt.group({
      _id: [null],
      title: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1)]],
    });
    this.fetchTask();
  }

  get title() {
    return this.editTask.controls['title'];
  }
  get description() {
    return this.editTask.controls['description'];
  }

  fetchTask() {
    this.taskService.getTask(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.task = res;
        this.editTask.patchValue(res);
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    console.log(this.editTask.value);
    this.taskService.updateTask(this.id, this.editTask.value).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/task-list');
        this.toastr.success('Task has been updated');
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
