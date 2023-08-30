import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Patient } from 'app/models/patient';
import { PatientService } from 'app/services/patient.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  allPatients: Patient[] = [];

  @Input() selectedPatient: Patient | null = null;

  @Output() CreateTriggered: EventEmitter<any> = new EventEmitter();

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  onSearchTriggered(searchText: any) {
    this.patientService
      .searchPatientList(searchText)
      .subscribe((patietnsResult) => {
        this.allPatients = patietnsResult;
      });
  }

  onUpdateTriggered(patient: any) {
    this.patientService.updatePatient(patient.id, patient).subscribe(() => {
      this.getPatients();
    });
  }

  onCreateTriggered(patient: any) {
    this.patientService.addPatient(patient as Patient).subscribe(() => {
      this.getPatients();
    });
  }

  onDeleteTriggered(patient: any) {
    this.patientService.deletePatient(patient.id).subscribe(() => {
      this.getPatients();
    });
  }

  getPatients() {
    this.patientService.getPatientList().subscribe({
      next: (data: Patient[]) => {
        this.allPatients = data;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Patient list loaded successfully.');
      },
    });
  }
}
