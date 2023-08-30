import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Patient } from 'app/models/patient';
import { PatientService } from 'app/services/patient.service';
import { CoreService } from 'app/services/core.service';

@Component({
  selector: 'app-add-eddit',
  templateUrl: './add-eddit.component.html',
  styleUrls: ['./add-eddit.component.css'],
})
export class AddEdditComponent implements OnInit {
  productForm: FormGroup;

  isVaccinated: boolean = true;
  @Output() CreateTriggered: EventEmitter<any> = new EventEmitter();

  vaccinated: string[] = ['yes', 'no'];
  @Input() selectedPatient: Patient | null = null;
  selectedPatientName: string = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private dialogueRef: MatDialogRef<AddEdditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    private coreService: CoreService
  ) {
    this.productForm = this.fb.group({
      id: '',
      isVaccinated: '',
    });
  }
  ngOnInit(): void {
    this.productForm?.patchValue(this.data);
  }

  onFormSubmit() {
    this.patientService
      .addPatient(this.productForm.value as Patient)
      .subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Patient added succesfully ');
          this.dialogueRef.close(true);
        },

        error: (err: any) => {
          console.error(err);
        },
      });
  }

  selectedPatientNameChange(newName: string) {
    this.selectedPatient!.name = newName;
  }
}
