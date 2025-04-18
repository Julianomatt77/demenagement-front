import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MailService} from '../../../services/mail.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form!: FormGroup;
  fromErrorMessage = '';
  subjectErrorMessage = '';
  messageErrorMessage = '';
  submitted: boolean = false;
  error: string = "";
  messageSent = false;
  messageFailed = false;

  constructor(private fb: FormBuilder, private mailService: MailService) {
    this.form = this.fb.group({
      from: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.messageSent = false;
    this.messageFailed = false;
    this.fromErrorMessage = 'Une adresse email est obligatoire'
    this.subjectErrorMessage = 'Un sujet est obligatoire'
    this.messageErrorMessage = 'Un message est obligatoire'
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.form.valid) {
      const { from, subject, message } = this.form.value;

      this.mailService.contact(from, subject, message).subscribe(
        response => {
          this.messageSent = true;
          this.submitted = false;
          this.form = this.fb.group({
            from: ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            message: ['', Validators.required]
          });
        },
        error => {
          this.messageFailed = true;
          this.error = 'Erreur lors de l\'envoi de l\'e-mail:';
          console.error('Erreur lors de l\'envoi de l\'e-mail:', error.error);
        }
      );
    }
  }

}
