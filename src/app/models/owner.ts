import { OwnerComponent } from '../components/owner/owner.component';
import { Patient } from './patient';

export class Owner {
  id: number;
  name: string;
  address: string;
  pets: Patient[];

  constructor(id: number, name: string, address: string, pets: Patient[]) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.pets = pets;
  }
}
