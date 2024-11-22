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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  id!: string;
  email!: any;
  password!: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fbu: FormBuilder,
    private router: Router
  ) {}

  get userEmail() {
    return this.loginForm.controls['email'];
  }
  get userPassword() {
    return this.loginForm.controls['password'];
  }

  ngOnInit(): void {
    this.loginForm = this.fbu.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.userService
      .getAllUsers()
      .then((res: any) => {
        console.log(res);
        let user: any = res.find((value: any) => {
          console.log(value);

          console.log(this.loginForm.value);

          if (
            value.email === this.loginForm.value.email &&
            value.password === this.loginForm.value.password
          ) {
            return value;
          }
        });
        console.log(user);
        if (user) {
          console.log('User found');
          localStorage.setItem('user', JSON.stringify(user));
          this.toastr.success('Login Successfull');
          this.userService.user.set(user);
          this.router.navigateByUrl('/todo');
        } else {
          console.log('User not found');
          this.toastr.error('Invalid credentials');
        }
        this.loginForm.reset();
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
}
