import {Component, inject, Input} from '@angular/core';
import {Carton} from '../../models/Carton';
import {User} from '../../models/User';
import {ElementFormComponent} from '../element-form/element-form.component';
import {StorageService} from '../../../services/storage.service';
import {CommonService} from '../../../services/common.service';
import {ElementService} from '../../../services/element.service';
import {Element} from '../../models/Element';
import {CartonService} from '../../../services/carton.service';

@Component({
  selector: 'app-element-wrapper',
  standalone: true,
  imports: [
    ElementFormComponent
  ],
  templateUrl: './element-wrapper.component.html',
  styleUrl: './element-wrapper.component.css'
})
export class ElementWrapperComponent {
  @Input() carton!: Carton;

  storageService = inject(StorageService);
  commonService = inject(CommonService);
  elementService = inject(ElementService);
  cartonService = inject(CartonService)

  user!: User;
  error = "";
  cartons: Carton[] = [];

  showNewElementForm: boolean = false;
  elementInEdit: number | null = null;

  ngOnInit() {
    this.user = this.storageService.getUser();
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

  toggleNewForm() {
    this.showNewElementForm = !this.showNewElementForm;
  }

  toggleEditForm(element: Element) {
    this.elementInEdit = element.id;
  }

  onAdd(element: Element, carton: Carton){
    // const CARTONS = this.commonService.cartons()
    // const targetCarton = CARTONS.find(c => c.id === carton.id);

    // if (targetCarton) {
    //   const lastIndex = Object.keys(targetCarton.elements).length;
    //   targetCarton.elements[lastIndex +1] = element;
    //
    //   this.commonService.setCartons(CARTONS);
    // }

    this.getAllCartons();
    this.toggleNewForm();
  }

  onUpdate(element: Element, carton: Carton){
    this.elementInEdit = null;
    // const CARTONS = this.commonService.cartons()
    // const targetCarton = CARTONS.find(c => c.id === carton.id);

    // if (targetCarton) {
    //   const entryKey = Object.keys(targetCarton.elements).find(
    //     key => targetCarton.elements[+key].id === element.id
    //   );
    //
    //   if (entryKey) {
    //     targetCarton.elements[+entryKey] = element;
    //   }
    //
    //   this.commonService.setCartons(CARTONS);
    // }
    this.getAllCartons();
  }

  deleteElement(element: Element, carton: Carton) {
    this.elementService.delete(element.id).subscribe(
        (data) => {
          this.getAllCartons();
          console.log('Objet ' + element.name + ' supprimé du carton ' + carton.numero);
        },
        error => {
          this.error = error;
        }
      );
  }

  updateElement(element: Element, carton: Carton){
    this.elementService.update(element.id, element).subscribe((element) => {
        this.onUpdate(element, carton);
      },
      error => {
        this.error = JSON.stringify(error.error);
        console.log(error.error);
      });
  }

  toggleElementInBox(element: Element, carton: Carton, input: HTMLInputElement) {
    const inBox = input.checked;
    element.in_box = inBox;
    element.out_box = !inBox;
    this.updateElement(element, carton);
  }

  asArray(elements: any): any[] {
    return Array.isArray(elements) ? elements : Object.values(elements);
  }

  closeEditForm(){
    this.elementInEdit = null;
  }
}
