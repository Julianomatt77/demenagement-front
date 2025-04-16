import {Carton} from './Carton';

export class Element {
  private _id: number;
  private _name: string;
  private _in_box: boolean;
  private _out_box: boolean;
  private _carton: Carton;

  constructor(id: number, name: string, in_box: boolean, out_box: boolean, carton: Carton) {
    this._id = id;
    this._name = name;
    this._in_box = in_box;
    this._out_box = out_box;
    this._carton = carton;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get in_box(): boolean {
    return this._in_box;
  }

  set in_box(value: boolean) {
    this._in_box = value;
  }

  get out_box(): boolean {
    return this._out_box;
  }

  set out_box(value: boolean) {
    this._out_box = value;
  }

  get carton(): Carton {
    return this._carton;
  }

  set carton(value: Carton) {
    this._carton = value;
  }
}
