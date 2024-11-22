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
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-to-do',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddToDoComponent implements OnInit {
  addTask!: FormGroup;

  constructor(
    private fbt: FormBuilder,
    private todoService: TodoService,
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
    this.todoService.addToDos(this.addTask.value).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/todo');
        Swal.fire('New Task Added!');
      },
      (error: Error) => {
        console.log(error);
      }
    );
    this.addTask.reset();
  }
}
