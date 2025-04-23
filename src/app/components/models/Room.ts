export class Room {
  private _id: number;
  private _name: string;
  private _color: string;
  // private _user: {id: number};
  // private _deleted_at: Date;
  private _cartons: Array<any>;


  constructor(id: number,
              name: string,
              color: string,
              // user: { id: number },
              // deleted_at: Date,
              cartons: Array<any>
  ) {
    this._id = id;
    this._name = name;
    this._color = color;
    // this._user = user;
    // this._deleted_at = deleted_at;
    this._cartons = cartons;
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

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
  //
  // get user(): { id: number } {
  //   return this._user;
  // }
  //
  // set user(value: { id: number }) {
  //   this._user = value;
  // }

  // get deleted_at(): Date {
  //   return this._deleted_at;
  // }
  //
  // set deleted_at(value: Date) {
  //   this._deleted_at = value;
  // }

  get cartons(): Array<any> {
    return this._cartons;
  }

  set cartons(value: Array<any>) {
    this._cartons = value;
  }
}
