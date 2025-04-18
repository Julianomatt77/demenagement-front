import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Demenageur} from '../../models/Demenageur';
import {CommonService} from '../../../services/common.service';
import {DemenageurService} from '../../../services/demenageur.service';

@Component({
  selector: 'app-demenageur-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './demenageur-form.component.html',
  styleUrl: './demenageur-form.component.css'
})
export class DemenageurFormComponent {
  @Output() formSubmitted: EventEmitter<Demenageur>;
  @Output() formClosed: EventEmitter<boolean>;
  @Input() demenageur!: Demenageur;
  @Input() isEdit!: boolean;

  form!: FormGroup;
  submitted: boolean = false;
  error: string = "";
  isMobile: boolean = false;

  constructor(private fb: FormBuilder, private demenageurService: DemenageurService, private commonService: CommonService) {
    this.formSubmitted = new EventEmitter<Demenageur>();
    this.formClosed = new EventEmitter<boolean>();

    if (!this.isEdit) {
      this.demenageur = new Demenageur(0, "", "", "", "",  "", null, null, null, null, );
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [""],
      phone: [""],
      devis_reference: [""],
      comment: [""],
      devis_price: null,
      paid: null,
      left_to_paid: null,
      devis_date: null,
    });

    if (this.isEdit) {
      //Correction de l'erreur de l'affichage de la date
      const dateDevis = this.demenageur.devis_date?.toString().substring(0, 10);

      this.form = this.fb.group({
        name: [this.demenageur.name, Validators.required],
        email: [this.demenageur.email],
        phone: [this.demenageur.phone],
        devis_reference: [this.demenageur.devis_reference],
        comment: [this.demenageur.comment],
        devis_price: [this.demenageur.devis_price],
        paid: [this.demenageur.paid],
        left_to_paid: [this.demenageur.left_to_paid],
        devis_date: dateDevis,
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
        this.demenageurService.update(this.demenageur.id, this.form.value).subscribe((data) => {
            this.demenageur = data;
            this.formSubmitted.emit(data);
          },
          error => {
            this.error = JSON.stringify(error.error);
            console.log(error.error);
          });
      } else {
        this.demenageurService.create(this.form.value).subscribe((data) => {
            this.demenageur = data;
            this.formSubmitted.emit(data);
          },
          error => {
            this.error = JSON.stringify(error.error);
            console.log(error.error);
          });
      }
    } else {
      if (!this.form.value.company) {
        this.error = "Un nom d'entreprise est obligatoire";
      } else {
        this.error = "Formulaire invalide";
      }
    }
  }

  closeForm(){
    this.formClosed.emit(true);
  }


}
