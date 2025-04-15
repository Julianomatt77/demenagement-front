import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StorageService} from '../../services/storage.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const authGuard = () => {
  const storageService = inject(StorageService)
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true
  }

  window.alert("Vous n'avez pas accès à cette page");
  return router.parseUrl('login');
}
