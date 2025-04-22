import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonService} from '../../../services/common.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage.service';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent {
  form!: FormGroup;
  submitted: boolean = false;
  error: string = "";
  commonService = inject(CommonService);
  storageService = inject(StorageService);

  success = "";

  passwordErrorMessage = 'Un mot de passe est obligatoire.';
  confirmPasswordErrorMessage = 'Les mots de passe ne correspondent pas.';
  confirmPasswordMissingErrorMessage = 'La confirmation du mot de passe est obligatoire.';
  passwordFieldType: string = 'password';
  passwordFieldIcon = 'visibility_off';
  isPasswordConfirmed = false;
  showDeleteConfirmModal = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });

    this.commonService.setBlurBackground(false)
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.error = '';
      this.validatePasswordsMatch()

      if (this.isPasswordConfirmed){
        this.authService.updatePassword(this.form.value.password).subscribe({
          next: (data) => {
            this.success = "Mot de passe modifié avec succès."
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

  deleteAccount(): void {
    this.success = "";
    this.error = "";
    this.authService.deleteAccount().subscribe({
      next: (data) => {
        this.success = "Compte supprimé avec succès."
        this.closeDeleteConfirmModal()
        setTimeout(() => {
          this.router.navigateByUrl('');
          this.authService.logout().subscribe(() => {
            this.router.navigateByUrl('');
            this.storageService.clean();
            this.commonService.setIsLoggedIn(false);
          });
        }, 3000);
      },
      error: (error) => {
        this.error = error.message;
        console.error(error.message);
      }
    })
  }

  openDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = true;
    this.commonService.toggleBlurBackground()
  }

  closeDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
    this.commonService.toggleBlurBackground()
  }

}
