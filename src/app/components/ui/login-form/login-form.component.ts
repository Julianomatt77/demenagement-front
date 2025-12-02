import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {StorageService} from '../../../services/storage.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';

const HAS_RELOADED = environment.has_reloaded;

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  providers: [AuthService]
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  token: string = "";
  isLoggedIn= false;
  isLoginFailed = false;
  error: string = "";
  email = '';
  submitted: boolean = false;
  usernameErrorMessage = '';
  emailErrorMessage = '';
  passwordErrorMessage = '';
  confirmPasswordErrorMessage = '';
  confirmPasswordMissingErrorMessage = '';
  isRegistration = false;
  label = '';
  passwordFieldType: string = 'password';
  passwordFieldIcon = 'visibility_off';
  isPasswordConfirmed = false;

  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private authService: AuthService, private router: Router, private storageService: StorageService) {
    this.isRegistration = false;
  }

  ngOnInit() {
    this.isRegistration = false;

    if (this.isRegistration) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['']
      })
    } else {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    this.activatedroute.data.subscribe(data => {
      this.isRegistration = data["registration"];
    })

    this.label = this.isRegistration ? "S'enregistrer" : "Se connecter";

    this.usernameErrorMessage = 'Un nom d\'utilisateur est obligatoire.';
    this.emailErrorMessage = 'Un email est obligatoire.';
    this.passwordErrorMessage = 'Un mot de passe est obligatoire.';
    this.confirmPasswordMissingErrorMessage = 'La confirmation du mot de passe est obligatoire.';
    this.confirmPasswordErrorMessage = 'Les mots de passe ne correspondent pas.';
  }

  onSubmit() {
    const username = this.loginForm.value.username.toLowerCase();
    const password = this.loginForm.value.password;
    const email = this.loginForm.value.email;
    this.submitted = true;

    if (this.loginForm.valid) {
      this.error = '';
      this.isLoginFailed = false;

      if (!this.isRegistration) {
        this.logInUser(username, password)
      } else {
        this.validatePasswordsMatch()

        if (this.isPasswordConfirmed){
          this.authService.register(username, email,password)
            .subscribe({
              next: (data) => {
                if (data.status){
                  this.logInUser(username, password)
                } else {
                  this.error = data.message
                  this.isLoginFailed = true;
                }
              },
              error: (error) => {
                this.error = error.error.message
                this.isLoginFailed = true;
              }
            })
        } else {
          this.isLoginFailed = true;
          this.error = 'Erreur lors de l\'inscription.';
        }
      }
    }
  }

  logInUser(username: string, password: string){
    this.authService.login(username, password)
      .subscribe({
        next: (data) => {
          this.token = data.token;
          this.isLoginFailed = false;
          this.authService.saveToken(this.token)
          this.isLoggedIn = true;

          this.authService.getUserInfos()
            .subscribe({
              next: (data) => {
                this.storageService.saveUser(data)
                this.email = this.storageService.getUser().email
                this.isLoggedIn = true;

                window.sessionStorage.removeItem(HAS_RELOADED);
                // Redirection après login
                setTimeout(() => {
                  this.router.navigateByUrl('');
                }, 2000);
              },
              error: (error) => {
                this.error = error.error.message
                console.error(error)
                this.isLoginFailed = true;
              },
            })
        },
        error: (error) => {
          this.error = error.error.message
          console.error(error)
          this.isLoginFailed = true;
        },
      })
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
    const passwordControl = this.loginForm.get('password')?.value;
    const confirmPasswordControl = this.loginForm.get('confirmPassword')?.value;

    if (passwordControl && confirmPasswordControl) {
      this.isPasswordConfirmed = passwordControl === confirmPasswordControl;
    }
  }
}
