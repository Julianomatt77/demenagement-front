import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {CommonService} from '../../../services/common.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.css'
})
export class ResetPwdComponent {
  form!: FormGroup;
  submitted: boolean = false;
  error: string = "";
  commonService = inject(CommonService);
  token: string | null;
  success = "";

  passwordErrorMessage = '';
  confirmPasswordErrorMessage = '';
  confirmPasswordMissingErrorMessage = '';
  passwordFieldType: string = 'password';
  passwordFieldIcon = 'visibility_off';
  isPasswordConfirmed = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.searchParams);
    this.token = urlParams.get('token') ? urlParams.get('token') : null;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });

    this.passwordErrorMessage = 'Un mot de passe est obligatoire.';
    this.confirmPasswordMissingErrorMessage = 'La confirmation du mot de passe est obligatoire.';
    this.confirmPasswordErrorMessage = 'Les mots de passe ne correspondent pas.';


  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.error = '';
      this.validatePasswordsMatch()

      if (this.isPasswordConfirmed){
        this.authService.resetPassword(this.form.value.password, this.token).subscribe({
          next: (data) => {
            this.success = "Mot de passe modifié avec succès. Vous allez être redirigé vers la page de connection."
            // this.emailSent = data.message
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 3000);
          },
          error: (error) => {
            this.error = error.error.message;
            console.error(error);
          }
        })
      } else {
        this.error = 'Les mots de passe ne correspondent pas';
      }

    } else {
      this.error = "Formulaire invalide";
    }
  }

  togglePasswordVisibility(): void {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordFieldIcon = 'visibility';
    } else {
      this.passwordFieldType = 'password';
      this.passwordFieldIcon = 'visibility_off';
    }
  }

  validatePasswordsMatch(): void {
    const passwordControl = this.form.get('password')?.value;
    const confirmPasswordControl = this.form.get('confirmPassword')?.value;

    if (passwordControl && confirmPasswordControl) {
      this.isPasswordConfirmed = passwordControl === confirmPasswordControl;
    }

  }
}
