import {Component, effect, inject} from '@angular/core';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {CommonService} from '../../../services/common.service';
import {FormBuilder} from '@angular/forms';
import {AdministratifService} from '../../../services/administratif.service';
import {Administratif} from '../../models/administratif';
import {DatePipe} from '@angular/common';
import {AdministratifFormComponent} from '../../ui/administratif-form/administratif-form.component';

@Component({
  selector: 'app-administratif',
  standalone: true,
  imports: [
    DatePipe,
    AdministratifFormComponent
  ],
  templateUrl: './administratif.component.html',
  styleUrl: './administratif.component.css'
})
export class AdministratifComponent {
  user!: User;
  isLoading = true;
  error: string = "";
  urlParamsString = "";
  isMobile: boolean = false;

  storageService = inject(StorageService);
  commonService = inject(CommonService);
  administratifService = inject(AdministratifService);
  fb = inject(FormBuilder);

  administratifList: Array<Administratif> = [];
  administratifToDelete: Administratif | null = null;
  showDeleteAdministratifConfirmModal = false;
  showNewForm: boolean = false;
  administratifInEditId: number | null = null;
  administratifInEdit: Administratif | null = null;

  constructor() {
    effect(() => {
      this.administratifList = this.commonService.administratifList();
    });

    effect(() => {
      this.urlParamsString = this.commonService.urlParamsString();
    })
  }

  ngOnInit() {
    this.user = this.storageService.getUser();
    this.getAdministratifList()

    this.commonService.setBlurBackground(false)

    this.isMobile = window.innerWidth < 640;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 640;
    });
  }

  getAdministratifList(){
    this.administratifService.getAll().subscribe(
      data => {
        this.administratifList = data;
        this.commonService.setAdministratifList(this.administratifList);
      },
      error => {
        this.error = JSON.stringify(error.error);
        console.log(error.error);
      }
    );
  }

  deleteConfirmed() {
    if (!this.administratifToDelete) return;

    this.administratifService.delete(this.administratifToDelete.id).subscribe(
      () => {
        this.administratifList = this.administratifList.filter(r => r.id !== this.administratifToDelete?.id);
        this.commonService.setAdministratifList(this.administratifList);
        this.deleteCancelled();
      },
      error => {
        this.error = error;
        this.deleteCancelled();
      }
    );
  }

  openDeleteConfirmModal(administratif: Administratif) {
    this.commonService.toggleBlurBackground()
    this.administratifToDelete = administratif;
    this.showDeleteAdministratifConfirmModal = true;
  }

  deleteCancelled() {
    this.administratifToDelete = null;
    this.commonService.toggleBlurBackground()
    this.showDeleteAdministratifConfirmModal = false;
  }

  toggleEditForm(administratif: Administratif) {
    this.administratifInEditId = administratif.id;
    this.administratifInEdit = administratif;
    if (this.isMobile){
      this.commonService.toggleBlurBackground()
    }
  }

  onAdd(administratif: Administratif){
    this.administratifList.push(administratif);
    this.commonService.setAdministratifList(this.administratifList);
    this.toggleNewForm();
    if (this.isMobile){
      this.commonService.toggleBlurBackground()
    }
  }

  onUpdate(administratif: Administratif){
    this.administratifList = this.administratifList.map(r => r.id === administratif.id ? administratif : r);
    this.commonService.setAdministratifList(this.administratifList);
    this.administratifInEdit = null;
    this.administratifInEditId = null;
    if (this.isMobile){
      this.commonService.toggleBlurBackground()
    }
  }

  toggleNewForm() {
    this.showNewForm = !this.showNewForm;
  }

}
