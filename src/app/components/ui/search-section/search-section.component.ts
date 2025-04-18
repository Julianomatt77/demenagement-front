import {Component, effect, inject} from '@angular/core';
import {CommonService} from '../../../services/common.service';
import {Room} from '../../models/Room';
import {FormsModule} from '@angular/forms';
import {Carton} from '../../models/Carton';

@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search-section.component.html',
  styleUrl: './search-section.component.css'
})
export class SearchSectionComponent {
  search = "";
  roomSelected: number | null = null;
  cartonSelected: number | null = null;
  private pageInputTimeout: any;
  rooms: Array<Room> = [];
  cartons: Array<Carton> = [];

  commonService = inject(CommonService)


  constructor() {
    effect(() => {
      this.rooms = this.commonService.rooms();
    });

    effect(() => {
      this.cartons = this.commonService.cartons();
    });
  }

  ngOnInit(){
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.searchParams);

    // Pré-remplissage de la recherche
    const elementParam = urlParams.get('element');
    if (elementParam) {
      this.search = elementParam ?? this.search;
    }

    // Présélection de la pièce dans le select
    const roomParam = urlParams?.get('room');
    if (roomParam) {
      if (roomParam) {
        this.roomSelected = +roomParam;
      }
    }

    const cartonParam = urlParams?.get('box');
    if (cartonParam) {
      if (cartonParam) {
        this.cartonSelected = +cartonParam;
      }
    }
  }

  updateSearch(){
    this.commonService.setAnyParmam('element', this.search)
  }

  onPageInputKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search = (event.target as HTMLInputElement).value
      this.updateSearch();
    } else {
      clearTimeout(this.pageInputTimeout);
      this.pageInputTimeout = setTimeout(() => {
        this.search = (event.target as HTMLInputElement).value
        this.updateSearch();
      }, 1000);
    }
  }

  resetSearch() {
    this.search = "";
    this.commonService.deleteParam('element');
  }

  filterRoom(event: Event) {
    this.commonService.deleteParam('room');
    const id = (event.target as HTMLSelectElement).value;
    this.commonService.setAnyParmam('room', id)
  }

  resetRoom() {
    this.commonService.deleteParam('room');
    this.roomSelected = null;
  }

  resetAllFilters() {
    this.resetSearch();
    this.resetRoom();
    this.resetCarton();
  }

  filterCarton(event: Event) {
    this.commonService.deleteParam('box');
    const id = (event.target as HTMLSelectElement).value;
    this.commonService.setAnyParmam('box', id)
  }

  resetCarton() {
    this.commonService.deleteParam('box');
    this.cartonSelected = null;
  }
}
