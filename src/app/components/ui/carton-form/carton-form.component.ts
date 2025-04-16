import {Component, effect, EventEmitter, Input, Output} from '@angular/core';
import {Carton} from '../../models/Carton';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CartonService} from '../../../services/carton.service';
import {Room} from '../../models/Room';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-carton-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './carton-form.component.html',
  styleUrl: './carton-form.component.css'
})
export class CartonFormComponent {
  @Output() formSubmitted: EventEmitter<Carton>;
  @Input() isEdit!: boolean;
  @Input() carton!: Carton;

  form!: FormGroup;
  submitted: boolean = false;
  rooms: Array<Room> = [];
  error: string = "";

  constructor(private fb: FormBuilder, private cartonService: CartonService, private commonService: CommonService) {
    this.formSubmitted = new EventEmitter<Carton>();
    if (!this.isEdit) {
      this.carton = new Carton(0, 0, false, false, null, []);
    }

    effect(() => {
      this.rooms = this.commonService.rooms();
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: [0],
      filled: [false],
      items_removed: [false],
      room: [null, Validators.required]
    });

    if (this.isEdit) {
      this.form = this.fb.group({
        numero: [this.carton.numero],
        filled: [this.carton.filled],
        items_removed: [this.carton.items_removed],
        room: [this.carton.room?.id ?? '', Validators.required]
      });
    }
    // console.log(this.room)
    // console.log(this.isEdit)
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      if (this.isEdit) {
        this.cartonService.update(this.carton.id, this.form.value).subscribe((carton) => {
          this.carton = carton;
          this.formSubmitted.emit(carton);
        },
          error => {
            this.error = JSON.stringify(error.error);
            console.log(error.error);
          });
      } else {
        this.cartonService.create(this.form.value).subscribe((carton) => {
          this.carton = carton;
          this.formSubmitted.emit(carton);
        },
        error => {
          this.error = JSON.stringify(error.error);
          console.log(error.error);
        });
      }
    } else {
      if (!this.form.value.room) {
        this.error = "La pièce est obligatoire";
      } else {
        this.error = "Formulaire invalide";
      }
    }
  }
}
