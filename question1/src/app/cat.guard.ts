import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';

export const catGuard: CanActivateFn = (route, state) => {

  if(!inject(UserService).currentUser?.prefercat){
    return createUrlTreeFromSnapshot(route,["/dog"]);
  }
  
  return true;
};
