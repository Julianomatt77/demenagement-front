import { Routes } from '@angular/router';
import {HomepageComponent} from './components/page/homepage/homepage.component';
import {LoginComponent} from './components/page/login/login.component';
import {CguComponent} from './components/page/cgu/cgu.component';
import {ErrorComponent} from './components/page/error/error.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: LoginComponent, data:{registration:true}},
  { path: 'not-found', component: ErrorComponent },
  {path: 'cgu', component: CguComponent},
  // {path: 'contact', component: ContactComponent},
  { path: '**', redirectTo: 'not-found'}
];
