import {Component, effect, inject} from '@angular/core';
import {CurrencyPipe, DatePipe, registerLocaleData} from '@angular/common';
import {DemenageurFormComponent} from '../../ui/demenageur-form/demenageur-form.component';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {CommonService} from '../../../services/common.service';
import {DemenageurService} from '../../../services/demenageur.service';
import {FormBuilder} from '@angular/forms';
import {Demenageur} from '../../models/Demenageur';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr-FR');

@Component({
  selector: 'app-demenageur',
  standalone: true,
  imports: [
    DatePipe,
    DemenageurFormComponent,
    CurrencyPipe
  ],
  templateUrl: './demenageur.component.html',
  styleUrl: './demenageur.component.css'
})
export class DemenageurComponent {
  user!: User;
  isLoading = true;
  error: string = "";
  urlParamsString = "";
  isMobile: boolean = false;

  storageService = inject(StorageService);
  commonService = inject(CommonService);
  demenageurService = inject(DemenageurService);
  fb = inject(FormBuilder);

  demenageurList: Array<Demenageur> = [];
  demenageurToDelete: Demenageur | null = null;
  showDeleteDemenageurConfirmModal = false;
  showNewForm: boolean = false;
  demenageurInEditId: number | null = null;
  demenageurInEdit: Demenageur | null = null;

  constructor() {
    effect(() => {
      this.demenageurList = this.commonService.demenageurList();
    });

    effect(() => {
      this.urlParamsString = this.commonService.urlParamsString();
    })
  }

  ngOnInit() {
    this.user = this.storageService.getUser();
    this.getDemenageurList()

    this.commonService.setBlurBackground(false)

    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  getDemenageurList(){
    this.demenageurService.getAll().subscribe(
      data => {
        this.demenageurList = data;
        this.commonService.setDemenageurList(this.demenageurList);
      },
      error => {
        this.error = JSON.stringify(error.error);
        console.log(error.error);
      }
    );
  }

  deleteConfirmed() {
    if (!this.demenageurToDelete) return;

    this.demenageurService.delete(this.demenageurToDelete.id).subscribe(
      () => {
        this.demenageurList = this.demenageurList.filter(r => r.id !== this.demenageurToDelete?.id);
        this.commonService.setDemenageurList(this.demenageurList);
        this.deleteCancelled();
      },
      error => {
        this.error = error;
        this.deleteCancelled();
      }
    );
  }

  openDeleteConfirmModal(demenageur: Demenageur) {
    this.commonService.toggleBlurBackground()
    this.demenageurToDelete = demenageur;
    this.showDeleteDemenageurConfirmModal = true;
  }

  deleteCancelled() {
    this.demenageurToDelete = null;
    this.commonService.toggleBlurBackground()
    this.showDeleteDemenageurConfirmModal = false;
  }

  toggleEditForm(demenageur: Demenageur) {
    this.demenageurInEditId = demenageur.id;
    this.demenageurInEdit = demenageur;
  }

  onAdd(demenageur: Demenageur){
    this.demenageurList.push(demenageur);
    this.commonService.setDemenageurList(this.demenageurList);
    this.toggleNewForm();
  }

  onUpdate(demenageur: Demenageur){
    this.demenageurList = this.demenageurList.map(r => r.id === demenageur.id ? demenageur : r);
    this.commonService.setDemenageurList(this.demenageurList);
    this.demenageurInEdit = null;
    this.demenageurInEditId = null;
  }

  toggleNewForm() {
    this.showNewForm = !this.showNewForm;
  }

  closeEditForm(){
    this.demenageurInEdit = null;
    this.demenageurInEditId = null;
  }

}
