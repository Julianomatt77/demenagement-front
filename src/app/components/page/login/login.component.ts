import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {LoginFormComponent} from '../../ui/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isRegistration = false;

  constructor(private router: Router, private activatedroute:ActivatedRoute) {}

  ngOnInit() {
    this.activatedroute.data.subscribe(data => {
      this.isRegistration = data["registration"];
    })
  }
}
