import {Component, inject, signal} from '@angular/core';
import {RoomFormComponent} from '../room-form/room-form.component';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {RoomService} from '../../../services/room.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Room} from '../../models/Room';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [RoomFormComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
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
  showNewRoomForm: boolean = false;
  roomInEdit: number | null = null;
  roomToDelete: Room | null = null;
  showDeleteRoomConfirmModal = false;
  blurBackground = this.commonService.blurBackground();

  ngOnInit() {
    this.user = this.storageService.getUser();

    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getAll().subscribe(
      rooms => {
        this.rooms = rooms;
        // console.log(this.rooms);
      },
      error => {
        this.error = JSON.stringify(error.error);
        console.log(error.error);
      }
    );
  }

  deleteRoomConfirmed() {
    if (!this.roomToDelete) return;

    this.roomService.delete(this.roomToDelete.id).subscribe(
      () => {
        this.rooms = this.rooms.filter(r => r.id !== this.roomToDelete?.id);
        this.cancelDeleteRoom();
      },
      error => {
        this.error = error;
        this.cancelDeleteRoom();
      }
    );
  }

  confirmDeleteRoom(room: Room) {
    this.roomToDelete = room;
    this.showDeleteRoomConfirmModal = true;
    this.commonService.toggleBlurBackground()
    // this.blurBackground = true;
  }

  cancelDeleteRoom() {
    this.roomToDelete = null;
    this.commonService.toggleBlurBackground()
    // this.blurBackground = false;
    this.showDeleteRoomConfirmModal = false;
  }

  toggleEditRoomForm(room: Room) {
    this.roomInEdit = room.id;
  }

  onRoomAdded(room: Room){
    this.rooms.push(room);
    this.showNewRoomForm = !this.showNewRoomForm;
  }

  onRoomUpdated(room: Room){
    this.rooms = this.rooms.map(r => r.id === room.id ? room : r);
    this.roomInEdit = null;
  }

  toggleNewRoomForm() {
    this.showNewRoomForm = !this.showNewRoomForm;
  }
}
