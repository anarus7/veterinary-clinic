import { OwnerComponent } from "../components/owner/owner.component";

export class Patient {
  id: number | undefined;
  name: string;
  species: string;
  breed: string;
  gender: string;
  imageUrl: string;
  isVaccinated: string;
  owner?: OwnerComponent;

  constructor(
    name: string,
    species: string,
    breed: string,
    gender: string,
    imageUrl = 'https://illustoon.com/photo/dl/7195.png',
    isVaccinated: string,
    owner?: OwnerComponent,
    
  ) {
    this.name = name;
    this.species = species;
    this.breed = breed;
    this.gender = gender;
    this.imageUrl = imageUrl;
    this.isVaccinated = isVaccinated;
    this.owner=owner;
  }
}
