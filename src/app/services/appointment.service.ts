import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private _http: HttpClient) {}

  addApp(data: Appointment): Observable<Appointment> {
    return this._http.post(
      'http://localhost:3000/appointments',
      data
    ) as Observable<Appointment>;
  }

  updatePatient(id: number, data: Patient): Observable<any> {
    return this._http.put(`http://localhost:3000/patients/${id}`, data);
  }

  getPatientList(): Observable<Patient[]> {
    return this._http.get('http://localhost:3000/patients') as Observable<
      Patient[]
    >;
  }

  deleteApp(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/appointments/${id}`);
  }

  getPatientsByOwnerId(ownerId: number): Observable<Patient[]> {
    return this._http.get<Patient[]>(
      `http://localhost:3000/patients/${ownerId}`
    );
  }
}
