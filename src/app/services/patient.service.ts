import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private _http: HttpClient) {}

  addPatient(data: Patient): Observable<Patient> {
    return this._http.post(
      'http://localhost:3000/patients',
      data
    ) as Observable<Patient>;
  }

  getPatientByID(data: Patient): Observable<Patient> {
    return this._http.post(
      'http://localhost:3000/patients',
      data
    ) as Observable<Patient>;
  }

  getPatientName(name: string): Observable<Patient> {
    return this._http.get<Patient>(`http://localhost:3000/patients/${name}`);
  }

  updatePatient(id: number, data: Patient): Observable<any> {
    return this._http.put(`http://localhost:3000/patients/${id}`, data);
  }

  getPatientList(): Observable<Patient[]> {
    return this._http.get('http://localhost:3000/patients') as Observable<
      Patient[]
    >;
  }

  deletePatient(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/patients/${id}`);
  }

  searchPatientList(searchText: string): Observable<Patient[]> {
    const searchUrl = `http://localhost:3000/patients?name_like=${searchText}`;
    return this._http.get(searchUrl) as Observable<Patient[]>;
  }

  getPatientsByOwnerId(ownerId: number): Observable<Patient[]> {
    return this._http.get<Patient[]>(
      `http://localhost:3000/patients/${ownerId}`
    );
  }

  getPatientByName(patientName: string): Observable<Patient> {
    const searchUrl = `http://localhost:3000/patients?name=${patientName}`;
    return this._http.get(searchUrl) as Observable<Patient>;
  }
}
