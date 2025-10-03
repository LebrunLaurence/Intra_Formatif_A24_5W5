import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const userGuardGuard: CanActivateFn = (route, state) => {


  if(inject(UserService).currentUser == null){
    return createUrlTreeFromSnapshot(route,["/login"]);
  }

  return true;
};
