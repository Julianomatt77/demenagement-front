import { Routes } from '@angular/router';
import {HomepageComponent} from './components/page/homepage/homepage.component';
import {LoginComponent} from './components/page/login/login.component';
import {CguComponent} from './components/page/cgu/cgu.component';
import {ErrorComponent} from './components/page/error/error.component';
import {authGuard} from './components/guard/auth.guard';
import {CartonsComponent} from './components/page/cartons/cartons.component';
import {AdministratifComponent} from './components/page/administratif/administratif.component';
import {DemenageurComponent} from './components/page/demenageur/demenageur.component';
import {ContactComponent} from './components/page/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: LoginComponent, data:{registration:true}},
  {path: 'cartons', canActivate: [authGuard], component: CartonsComponent},
  {path: 'demenageurs', canActivate: [authGuard], component: DemenageurComponent},
  {path: 'administratif', canActivate: [authGuard], component: AdministratifComponent},
  {path: 'cgu',component: CguComponent},
  {path: 'contact', component: ContactComponent},
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: 'not-found'}
];
