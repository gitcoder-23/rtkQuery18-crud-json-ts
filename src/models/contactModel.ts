export interface IContactMain {
  contacts: IContact[];
}

export interface IContact {
  name: string;
  email: string;
  contact: string;
  id?: number | string;
}
