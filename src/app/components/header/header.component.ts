import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

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

  logOut() {
    localStorage.removeItem('user');
    this.toastr.success('Logged Out');
    this.userService.user.set(null);
    return this.router.navigateByUrl('/');
  }
}
