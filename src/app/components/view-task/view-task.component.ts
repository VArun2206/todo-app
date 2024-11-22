import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css',
})
export class ViewTaskComponent implements OnInit {
  id!: string;
  task!: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchTask();
  }

  fetchTask() {
    this.taskService.getTask(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.task = res;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
