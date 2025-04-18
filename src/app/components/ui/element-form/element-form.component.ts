import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Carton} from '../../models/Carton';
import {Element} from '../../models/Element';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ElementService} from '../../../services/element.service';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-element-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './element-form.component.html',
  styleUrl: './element-form.component.css'
})
export class ElementFormComponent {
  @Output() formSubmitted: EventEmitter<Element>;
  @Output() formClosed: EventEmitter<boolean>;
  @Input() carton!: Carton;
  @Input() isEdit!: boolean;
  @Input() element!: Element;

  form!: FormGroup;
  submitted: boolean = false;
  error: string = "";

  constructor(private fb: FormBuilder, private elementService: ElementService, private commonService: CommonService) {
    this.formSubmitted = new EventEmitter<Element>();
    this.formClosed = new EventEmitter<boolean>();

    if (!this.isEdit) {
      this.element = new Element(0, "", false, false, this.carton);
    }
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      in_box: [false],
      out_box: [false],
      carton: [this.carton?.numero ?? '', Validators.required]
    });

    if (this.isEdit) {
      this.form = this.fb.group({
        name: [this.element.name, Validators.required],
        in_box: [this.element.in_box],
        out_box: [this.element.out_box],
        carton: [this.carton?.numero ?? '', Validators.required]
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.value.out_box = !this.form.value.in_box;
      this.submitted = true;
      if (this.isEdit) {
        this.elementService.update(this.element.id, this.form.value).subscribe((element) => {
            this.element = element;
            this.formSubmitted.emit(element);
          },
          error => {
            this.error = JSON.stringify(error.error);
            console.log(error.error);
          });
      } else {
        this.elementService.create(this.form.value).subscribe((element) => {
            this.element = element;
            this.formSubmitted.emit(element);
          },
          error => {
            this.error = JSON.stringify(error.error);
            console.log(error.error);
          });
      }
    } else {
      if (!this.form.value.name) {
        this.error = "Un nom est obligatoire";
      } else {
        this.error = "Formulaire invalide";
      }
    }
  }

  closeForm(){
    this.formClosed.emit(true);
  }
}
