import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from 'app/models/patient';
import { PatientService } from 'app/services/patient.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  @Input()
  patients: Patient[] = [];
  patient: Patient | undefined;

  @Input() selectedPatient: Patient | null = null;

  @Output() onCreateTriggeredButton: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteTriggered: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateTriggered: EventEmitter<any> = new EventEmitter();

  constructor(private patientService: PatientService) {}

  ngOnInit() {}

  addPatient(newPatient: Patient): void {
    this.patients.push(newPatient);
  }

  deletePatient(patient: Patient | undefined) {
    this.onDeleteTriggered.emit(patient);
  }

  updatePatient(patient: Patient | undefined) {
    this.onUpdateTriggered.emit(patient);
  }

  getPatientbyId(id: number) {
    this.patientService
      .getPatientsByOwnerId(id)
      .subscribe((data: Patient[]) => (this.patient = data[0]));
  }
}
