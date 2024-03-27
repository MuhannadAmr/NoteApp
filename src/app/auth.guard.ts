import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  let _AuthService = inject(AuthService)
  if(localStorage.getItem('userTokenNotes') != null){
    _AuthService.saveDataMethod()
    return true;
  }else{
    _Router.navigate(['/signin']);
    return false;
  }
};
