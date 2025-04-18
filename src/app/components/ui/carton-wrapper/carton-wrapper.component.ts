import {Component, effect, EventEmitter, inject, Output} from '@angular/core';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {CommonService} from '../../../services/common.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Carton} from '../../models/Carton';
import {Element} from '../../models/Element';
import {CartonService} from '../../../services/carton.service';
import {Room} from '../../models/Room';
import {CartonFormComponent} from '../carton-form/carton-form.component';
import {ElementWrapperComponent} from '../element-wrapper/element-wrapper.component';
import {ElementFormComponent} from '../element-form/element-form.component';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-carton-wrapper',
  standalone: true,
  imports: [
    CartonFormComponent,
    ElementWrapperComponent,
    ElementFormComponent
  ],
  templateUrl: './carton-wrapper.component.html',
  styleUrl: './carton-wrapper.component.css'
})
export class CartonWrapperComponent {
  @Output() selectedCarton = new EventEmitter<Carton>();

  user!: User;
  isLoading = true;
  error: string = "";
  fb = inject(FormBuilder);

  storageService = inject(StorageService);
  commonService = inject(CommonService);
  cartonService = inject(CartonService);

  cartons: Array<Carton> = [];
  formCartonFiltered!: FormGroup;
  showNewCartonForm: boolean = false;
  cartonInEdit: number | null = null;

  showNewElementForm: boolean = false;
  addElementOnCarton: number | null = null;

  constructor() {
    effect(() => {
      this.cartons = this.commonService.cartons();
    });
  }

  ngOnInit() {
    this.user = this.storageService.getUser();

    this.getAllCartons();
  }

  getAllCartons() {
    this.cartonService.getAll().subscribe(
      cartons => {
        this.cartons = cartons;
        this.commonService.setCartons(this.cartons);
        // console.log(this.cartons);
      },
      error => {
        this.error = JSON.stringify(error.error);
        console.log(error.error);
      }
    );
  }

  openDeleteConfirmModal(carton: Carton) {
    this.selectedCarton.emit(carton);
  }

  toggleEditCartonForm(carton: Carton) {
    this.cartonInEdit = carton.id;
  }

  onAdd(carton: Carton){
    this.cartons.push(carton);
    this.commonService.setCartons(this.cartons);
    this.toggleNewForm();
  }

  onUpdate(carton: Carton){
    this.cartons = this.cartons.map(r => r.id === carton.id ? carton : r);
    this.commonService.setCartons(this.cartons);
    this.cartonInEdit = null;
  }

  toggleNewForm() {
    this.showNewCartonForm = !this.showNewCartonForm;
  }

  toggleNewElementForm(carton: Carton) {
    this.showNewElementForm = !this.showNewElementForm;
    this.addElementOnCarton = carton.id
  }

  onAddElement(element: Element, carton: Carton){
    const targetCarton = this.cartons.find(c => c.id === carton.id);

    if (targetCarton) {
      const lastIndex = Object.keys(targetCarton.elements).length;
      targetCarton.elements[lastIndex] = element;

      this.commonService.setCartons(this.cartons);
    }

    // this.commonService.setCartons(this.cartons);
    this.toggleNewElementForm(carton);
  }

  isNotEmpty(elements: any): boolean {
    if (Array.isArray(elements)) {
      return elements.length > 0;
    }

    if (elements && typeof elements === 'object') {
      return Object.keys(elements).length > 0;
    }

    return false;
  }

  toggleCartonFilled(carton: Carton, input: HTMLInputElement) {
    const isFilled = input.checked;
    carton.filled = isFilled;
    this.updateCarton(carton);
  }

  toggleCartonDeballe(carton: Carton, input: HTMLInputElement){
    const isDeballe = input.checked;
    carton.items_removed = isDeballe;
    this.updateCarton(carton);
  }

  updateCarton(carton: Carton){
    this.cartonService.update(carton.id, carton).subscribe((carton) => {
        this.onUpdate(carton);
      },
      error => {
        this.error = JSON.stringify(error.error);
        console.log(error.error);
      });
  }



}
