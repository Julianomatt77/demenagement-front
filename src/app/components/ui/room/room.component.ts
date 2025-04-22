import {Component, effect, EventEmitter, inject, Output, signal} from '@angular/core';
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
  @Output() selectedRoom = new EventEmitter<Room>();

  user!: User;
  isLoading = true;
  error: string = "";
  storageService = inject(StorageService);
  private roomService = inject(RoomService);
  commonService = inject(CommonService);
  fb = inject(FormBuilder);

  rooms: Array<Room> = [];
  formRoomFiltered!: FormGroup;
  showNewRoomForm: boolean = false;
  roomInEdit: number | null = null;

  constructor() {
    effect(() => {
      this.rooms = this.commonService.rooms();
    });
  }

  ngOnInit() {
    this.user = this.storageService.getUser();

    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getAll().subscribe(
      rooms => {
        this.rooms = rooms;
        this.commonService.setRooms(this.rooms);
        // console.log(this.rooms);
      },
      error => {
        this.error = JSON.stringify(error.error);
        console.log(error.error);
      }
    );
  }

  openDeleteRoomConfirmModal(room: Room) {
    this.selectedRoom.emit(room);
  }

  toggleEditRoomForm(room: Room) {
    this.roomInEdit = room.id;
  }

  onRoomAdded(room: Room){
    this.rooms.push(room);
    this.commonService.setRooms(this.rooms);
    this.toggleNewRoomForm()
  }

  onRoomUpdated(room: Room){
    this.rooms = this.rooms.map(r => r.id === room.id ? room : r);
    this.commonService.setRooms(this.rooms);
    this.roomInEdit = null;
  }

  toggleNewRoomForm() {
    this.showNewRoomForm = !this.showNewRoomForm;
  }

  closeEditForm(){
    this.roomInEdit = null;
  }
}
