import {Component, effect, inject} from '@angular/core';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {Room} from '../../models/Room';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RoomService} from '../../../services/room.service';
import {RoomFormComponent} from '../../ui/room-form/room-form.component';
import {CommonService} from '../../../services/common.service';
import {RoomComponent} from '../../ui/room/room.component';

@Component({
  selector: 'app-cartons',
  standalone: true,
  imports: [RoomComponent],
  templateUrl: './cartons.component.html',
  styleUrl: './cartons.component.css'
})
export class CartonsComponent {
  user!: User;
  isLoading = true;
  error: string = "";
  storageService = inject(StorageService);
  private roomService = inject(RoomService);
  commonService = inject(CommonService);
  fb = inject(FormBuilder);

  rooms: Array<Room> = [];
  formRoomFiltered!: FormGroup;
  selectedRoom: Room | null = null;
  displayRooms: boolean = true;
  roomToDelete: Room | null = null;
  showDeleteRoomConfirmModal = false;

  constructor() {
    effect(() => {
      this.rooms = this.commonService.rooms();
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
}
