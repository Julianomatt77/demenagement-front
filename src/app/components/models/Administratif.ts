export class Administratif {
  private _id: number;
  private _company: string;
  private _assigned_user: string;
  private _comment: string;
  private _date_created: Date | string |null;
  private _date_done: Date | string |null;

  constructor(id: number, company: string, assigned_user: string, comment: string, date_created: Date | string |null, date_done: Date | string |null) {
    this._id = id;
    this._company = company;
    this._assigned_user = assigned_user;
    this._comment = comment;
    this._date_created = date_created;
    this._date_done = date_done;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get company(): string {
    return this._company;
  }

  set company(value: string) {
    this._company = value;
  }

  get assigned_user(): string {
    return this._assigned_user;
  }

  set assigned_user(value: string) {
    this._assigned_user = value;
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }

  get date_created(): Date | string | null {
    return this._date_created;
  }

  set date_created(value: Date | string |null) {
    this._date_created = value;
  }

  get date_done(): Date | string |null {
    return this._date_done;
  }

  set date_done(value: Date | string |null) {
    this._date_done = value;
  }
}
