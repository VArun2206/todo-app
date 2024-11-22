import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  let user = userService.getUserFromLocalStorage();
  if (user === null) {
    toastr.error("You are'nt logged  in");
    router.navigateByUrl('/login');
    return false;
  } else {
    return true;
  }
};
