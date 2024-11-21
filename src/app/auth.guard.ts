import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './services/user.service';

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
