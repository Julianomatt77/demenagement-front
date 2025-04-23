import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Room} from '../../models/Room';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoomService} from '../../../services/room.service';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent {
  @Output() formSubmitted: EventEmitter<Room>;
  @Output() formClosed: EventEmitter<boolean>;
  @Input() isEdit!: boolean;
  @Input() room!: Room;

  form!: FormGroup;

  submitted: boolean = false;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.formSubmitted = new EventEmitter<Room>();
    this.formClosed = new EventEmitter<boolean>();

    if (!this.isEdit) {
      this.room = new Room(0, "", "", []);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.isEdit) {
      this.form = this.fb.group({
        name: [this.room.name, Validators.required]
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      if (this.isEdit) {
        this.roomService.update(this.room.id, this.form.value).subscribe((room) => {
          this.room = room;
          this.formSubmitted.emit(room);
        });
      } else {
        this.roomService.create(this.form.value).subscribe((room) => {
          this.room = room;
          this.formSubmitted.emit(room);
        });
      }
    }
  }

  closeForm(){
    this.formClosed.emit(true);
  }

}
