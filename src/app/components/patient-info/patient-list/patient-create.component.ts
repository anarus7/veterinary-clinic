import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconDefinition, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Patient } from 'app/models/patient';
import { PatientService } from 'app/services/patient.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css'],
})
export class PatientCreateComponent implements OnInit {
  patients: Patient[] = [];

  @Output() onCreateTriggered: EventEmitter<any> = new EventEmitter();

  newPatientName = '';
  newPatientSpecies = '';
  newPatientBreed = '';
  newPatientGender = '';
  newPatientVaccStatus = '';
  newPatientUrl = '';

  constructor(private patientService: PatientService) {}
  // Add the addPatient method here
  addPatient() {
    const newPatient = new Patient(
      this.newPatientName,
      this.newPatientSpecies,
      this.newPatientBreed,
      this.newPatientGender,
      this.newPatientVaccStatus,
      this.newPatientUrl
    );
    this.onCreateTriggered.emit(newPatient as Patient);


    this.newPatientName = '';
    this.newPatientSpecies = '';
    this.newPatientBreed = '';
    this.newPatientGender = '';
    this.newPatientVaccStatus = '';
    this.newPatientUrl = '';
  }

  ngOnInit() {}
  faDog = faDog;



  setGender(gender: string) {
    this.newPatientGender = gender;
  }
  
  genderOptions = ['Male', 'Female'];

}
