export class Demenageur {
  private _id: number;
  private _name: string;
  private _email: string | null;
  private _phone: string | null;
  private _devis_reference: string | null;
  private _comment: string | null;
  private _devis_price: number | null;
  private _paid: number | null;
  private _left_to_paid: number | null;
  private _devis_date: Date | string | null;

  constructor(id: number, name: string, email: string | null, phone: string | null, devis_reference: string | null, comment: string | null, devis_price: number | null, paid: number | null, left_to_paid: number | null, devis_date: Date | string | null) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._devis_reference = devis_reference;
    this._comment = comment;
    this._devis_price = devis_price;
    this._paid = paid;
    this._left_to_paid = left_to_paid;
    this._devis_date = devis_date;
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

  get email(): string | null {
    return this._email;
  }

  set email(value: string | null) {
    this._email = value;
  }

  get phone(): string | null {
    return this._phone;
  }

  set phone(value: string | null) {
    this._phone = value;
  }

  get devis_reference(): string | null {
    return this._devis_reference;
  }

  set devis_reference(value: string | null) {
    this._devis_reference = value;
  }

  get comment(): string | null {
    return this._comment;
  }

  set comment(value: string | null) {
    this._comment = value;
  }

  get devis_price(): number | null {
    return this._devis_price;
  }

  set devis_price(value: number | null) {
    this._devis_price = value;
  }

  get paid(): number | null {
    return this._paid;
  }

  set paid(value: number | null) {
    this._paid = value;
  }

  get left_to_paid(): number | null {
    return this._left_to_paid;
  }

  set left_to_paid(value: number | null) {
    this._left_to_paid = value;
  }

  get devis_date(): Date | string | null {
    return this._devis_date;
  }

  set devis_date(value: Date | string | null) {
    this._devis_date = value;
  }
}
