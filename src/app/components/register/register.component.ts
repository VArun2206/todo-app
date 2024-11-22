import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fbr: FormBuilder,
    private router: Router
  ) {}

  get name() {
    return this.registerForm.controls['name'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }

  ngOnInit(): void {
    this.registerForm = this.fbr.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.userService
      .addUser(this.registerForm.value)
      .then((res: any) => {
        console.log(res);
        if (res._id) {
          this.toastr.success('Registeration SUccessfull!');
          return this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(res.message);
          return this.router.navigateByUrl('/login');
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
}
