export class User {
  private _id: string;
  private _email: string;

  constructor(id: string, email: string) {
    this._id = id;
    this._email = email;
  }

  get id(): string {
    return this._id;
  }


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
