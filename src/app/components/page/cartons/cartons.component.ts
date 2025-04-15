import {Component, inject} from '@angular/core';
import {User} from '../../models/User';
import {StorageService} from '../../../services/storage.service';
import {Room} from '../../models/Room';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RoomService} from '../../../services/room.service';
import {RoomFormComponent} from '../../ui/room-form/room-form.component';

@Component({
  selector: 'app-cartons',
  standalone: true,
  imports: [RoomFormComponent],
  templateUrl: './cartons.component.html',
  styleUrl: './cartons.component.css'
})
export class CartonsComponent {
  user!: User;
  isLoading = true;
  error: string = "";
  storageService = inject(StorageService);
  private roomService = inject(RoomService);
  fb = inject(FormBuilder);

  rooms: Array<Room> = [];
  formRoomFiltered!: FormGroup;
  selectedRoom: Room | null = null;
  showNewRoomForm: boolean = false;
  roomInEdit: number | null = null;
  displayRooms: boolean = true;
  roomToDelete: Room | null = null;
  showDeleteRoomConfirmModal = false;

  constructor() {
  }

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
        this.error = error;
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
  }

  cancelDeleteRoom() {
    this.roomToDelete = null;
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

  toggleDisplayRooms(){
    this.displayRooms = !this.displayRooms;
  }
}
