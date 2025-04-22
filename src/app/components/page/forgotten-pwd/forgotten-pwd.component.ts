import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-forgotten-pwd',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './forgotten-pwd.component.html',
  styleUrl: './forgotten-pwd.component.css'
})
export class ForgottenPwdComponent {

  form!: FormGroup;
  submitted: boolean = false;
  error: string = "";
  emailSent = "";

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.authService.sendForgottenPwdEmail(this.form.value.email).subscribe({
        next: (data) => {
          this.emailSent = data.message
        },
        error: (error) => {
          this.error = error.message;
          console.error(error);
        }
      })
    } else {
      this.error = "Formulaire invalide";
    }
  }

}
