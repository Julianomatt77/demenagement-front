import {Component, effect, inject} from '@angular/core';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {Room} from '../../models/Room';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RoomService} from '../../../services/room.service';
import {CommonService} from '../../../services/common.service';
import {RoomComponent} from '../../ui/room/room.component';
import {CartonWrapperComponent} from '../../ui/carton-wrapper/carton-wrapper.component';
import {Carton} from '../../models/Carton';
import {CartonService} from '../../../services/carton.service';

@Component({
  selector: 'app-cartons',
  standalone: true,
  imports: [RoomComponent, CartonWrapperComponent],
  templateUrl: './cartons.component.html',
  styleUrl: './cartons.component.css'
})
export class CartonsComponent {
  user!: User;
  isLoading = true;
  error: string = "";
  storageService = inject(StorageService);
  private roomService = inject(RoomService);
  private cartonService = inject(CartonService);
  commonService = inject(CommonService);
  fb = inject(FormBuilder);

  rooms: Array<Room> = [];
  formRoomFiltered!: FormGroup;
  selectedRoom: Room | null = null;
  displayRooms: boolean = true;
  roomToDelete: Room | null = null;
  showDeleteRoomConfirmModal = false;

  cartons: Array<Carton> = [];
  selectedCarton : Carton | null = null
  cartonToDelete: Carton | null = null;
  showDeleteCartonConfirmModal = false;

  constructor() {
    effect(() => {
      this.rooms = this.commonService.rooms();
      this.cartons = this.commonService.cartons();
    });

    effect(() => {
      this.cartons = this.commonService.cartons();
    });
  }

  ngOnInit() {
    this.user = this.storageService.getUser();
  }

  deleteRoomConfirmed() {
    if (!this.roomToDelete) return;

    this.roomService.delete(this.roomToDelete.id).subscribe(
      () => {
        this.rooms = this.rooms.filter(r => r.id !== this.roomToDelete?.id);
        this.commonService.setRooms(this.rooms);
        this.deleteRoomCancelled();
      },
      error => {
        this.error = error;
        this.deleteRoomCancelled();
      }
    );
  }

  deleteCartonConfirmed() {
    if (!this.cartonToDelete) return;

    this.cartonService.delete(this.cartonToDelete.id).subscribe(
      () => {
        this.cartons = this.cartons.filter(r => r.id !== this.cartonToDelete?.id);
        this.commonService.setCartons(this.cartons);
        this.deleteCartonCancelled();
      },
      error => {
        this.error = error;
        this.deleteCartonCancelled();
      }
    );
  }

  openDeleteRoomConfirmModal(room: Room) {
    this.commonService.toggleBlurBackground()
    this.roomToDelete = room;
    this.showDeleteRoomConfirmModal = true;
  }

  deleteRoomCancelled() {
    this.roomToDelete = null;
    this.commonService.toggleBlurBackground()
    this.showDeleteRoomConfirmModal = false;
  }

  toggleDisplayRooms(){
    this.displayRooms = !this.displayRooms;
  }

  openDeleteCartonConfirmModal(carton: Carton) {
    this.commonService.toggleBlurBackground()
    this.cartonToDelete = carton;
    this.showDeleteCartonConfirmModal = true;
  }

  deleteCartonCancelled() {
    this.cartonToDelete = null;
    this.commonService.toggleBlurBackground()
    this.showDeleteCartonConfirmModal = false;
  }
}
