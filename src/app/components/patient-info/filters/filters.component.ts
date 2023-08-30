import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Patient } from '../../../models/patient';
import { PatientService } from 'app/services/patient.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  names: Patient[] = [];
  searchText = '';

  selectedPatient: Patient | undefined;

  @Output() searchTriggered: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private patientService: PatientService
  ) {}

  onSearchSubmit(event: Event) {
    event.preventDefault();
    this.searchTriggered.emit(this.searchText);
  }

  fetchNames(searchText: string = '') {
    const searchUrl = `http://localhost:3000/patients?name_like=${searchText}`;
    this.http
      .get<Patient[]>(searchUrl)
      .pipe(
        tap((data) => {
          console.log('Fetched data:', data);
          this.names = data;
        }),
        catchError((error) => {
          console.error('Error fetching names:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

 
}
