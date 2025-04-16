import {Component, effect, EventEmitter, inject, Output} from '@angular/core';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {CommonService} from '../../../services/common.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Carton} from '../../models/Carton';
import {CartonService} from '../../../services/carton.service';
import {Room} from '../../models/Room';
import {CartonFormComponent} from '../carton-form/carton-form.component';

@Component({
  selector: 'app-carton-wrapper',
  standalone: true,
  imports: [
    CartonFormComponent
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

}
