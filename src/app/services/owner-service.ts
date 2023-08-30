// ...
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient'; // Update the path to your Patient model
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerComponent } from '../components/owner/owner.component';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private apiUrl = 'http://localhost:3000'; // Replace with your JSON server URL

  constructor(private http: HttpClient) {}

  getOwners(): Observable<Owner[]> {
    return this.http.get(`${this.apiUrl}/owners`) as Observable<Owner[]>;
  }
  getOwner(ownerId: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.apiUrl}/owners/${ownerId}`);
  }

  getOwnerByName(ownerName: string): Observable<Owner[]> {
    return this.http.get<Owner[]>(
      `${this.apiUrl}/owners?name=${ownerName}`
    ) as Observable<Owner[]>;
  }

  addOwner(data: Owner): Observable<Owner> {
    return this.http.post(
      'http://localhost:3000/owners',
      data
    ) as Observable<Owner>;
  }
  updateOwner(id: number, data: Owner): Observable<Owner> {
    return this.http.put(
      `http://localhost:3000/owners/${id}`,
      data
    ) as Observable<Owner>;
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/owners/${id}`);
  }
}
