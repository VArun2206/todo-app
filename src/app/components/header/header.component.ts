import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user!: any | null;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}
  @Input() title!: string;

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  logOutConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You have to login again to access your tasks!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
      }
    });
  }

  logOut() {
    localStorage.removeItem('user');
    // this.toastr.success('Logged Out');
    this.userService.user.set(null);
    Swal.fire({
      title: 'Logged out!',
      text: 'Your have been logged out.',
      icon: 'success',
    });
    return this.router.navigateByUrl('/');
  }
}
