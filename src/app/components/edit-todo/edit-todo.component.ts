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
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-edit-to-do',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
})
export class EditToDoComponent implements OnInit {
  addTask!: FormGroup;
  id!: string;
  todo!: any;

  constructor(
    private fbt: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addTask = this.fbt.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1)]],
    });
    this.fetchTask();
  }

  get title() {
    return this.addTask.controls['title'];
  }
  get description() {
    return this.addTask.controls['description'];
  }

  fetchTask() {
    this.todoService.getTaskById(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.todo = res;
        this.addTask.patchValue(res);
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    console.log(this.addTask.value);
    this.todoService.updateToDos(this.id, this.addTask.value).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/todo');
        this.toastr.success('Task has been updated');
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
