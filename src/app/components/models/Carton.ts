import {Room} from './Room';
import {Element} from './Element';

export class Carton {
  private _id: number;
  private _numero: number;
  private _filled: boolean;
  private _items_removed: boolean;
  private _room: Room | null;
  private _elements: Array<Element>;

  constructor(id: number, numero: number, filled: boolean, items_removed: boolean, room: Room | null, elements: Array<Element>) {
    this._id = id;
    this._numero = numero;
    this._filled = filled;
    this._items_removed = items_removed;
    this._room = room;
    this._elements = elements;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get numero(): number {
    return this._numero;
  }

  set numero(value: number) {
    this._numero = value;
  }

  get filled(): boolean {
    return this._filled;
  }

  set filled(value: boolean) {
    this._filled = value;
  }

  get items_removed(): boolean {
    return this._items_removed;
  }

  set items_removed(value: boolean) {
    this._items_removed = value;
  }

  get room(): Room | null {
    return this._room;
  }

  set room(value: Room) {
    this._room = value;
  }

  get elements(): Array<Element> {
    return this._elements;
  }

  set elements(value: Array<Element>) {
    this._elements = value;
  }
}
