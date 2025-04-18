import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Administratif} from '../../models/Administratif';
import {CommonService} from '../../../services/common.service';
import {AdministratifService} from '../../../services/administratif.service';

@Component({
  selector: 'app-administratif-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './administratif-form.component.html',
  styleUrl: './administratif-form.component.css'
})
export class AdministratifFormComponent {
  @Output() formSubmitted: EventEmitter<Administratif>;
  @Input() administratif!: Administratif;
  @Input() isEdit!: boolean;

  form!: FormGroup;
  submitted: boolean = false;
  error: string = "";
  isMobile: boolean = false;

  constructor(private fb: FormBuilder, private administratifService: AdministratifService, private commonService: CommonService) {
    this.formSubmitted = new EventEmitter<Administratif>();

    if (!this.isEdit) {
      this.administratif = new Administratif(0, "", "", "", null,  null);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      company: ['', Validators.required],
      assigned_user: [""],
      comment: [""],
      date_created: null,
      date_done: null,
    });

    if (this.isEdit) {
      //Correction de l'erreur de l'affichage de la date
      const dateCreated = this.administratif.date_created?.toString().substring(0, 10);
      const dateDone = this.administratif.date_done?.toString().substring(0, 10);

      this.form = this.fb.group({
        company: [this.administratif.company, Validators.required],
        assigned_user: [this.administratif.assigned_user],
        comment: [this.administratif.comment],
        date_created: dateCreated,
        date_done: dateDone,
      });
    }

    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      if (this.isEdit) {
        this.administratifService.update(this.administratif.id, this.form.value).subscribe((data) => {
            this.administratif = data;
            this.formSubmitted.emit(data);
          },
          error => {
            this.error = JSON.stringify(error.error);
            console.log(error.error);
          });
      } else {
        this.administratifService.create(this.form.value).subscribe((data) => {
            this.administratif = data;
            this.formSubmitted.emit(data);
          },
          error => {
            this.error = JSON.stringify(error.error);
            console.log(error.error);
          });
      }
    } else {
      if (!this.form.value.company) {
        this.error = "Un organisme est obligatoire";
      } else {
        this.error = "Formulaire invalide";
      }
    }
  }

}
