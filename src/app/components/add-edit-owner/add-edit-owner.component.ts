import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Owner } from 'app/models/owner';
import { Patient } from 'app/models/patient';
import { CoreService } from 'app/services/core.service';
import { OwnerService } from 'app/services/owner-service';
import { PatientService } from 'app/services/patient.service';

@Component({
  selector: 'app-add-edit-owner',
  templateUrl: './add-edit-owner.component.html',
  styleUrls: ['./add-edit-owner.component.css'],
})
export class AddEditOwnerComponent implements OnInit {
  ownerForm: FormGroup;
  patients: Patient[] = [];

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Owner,
    private _dialogueRef: MatDialogRef<AddEditOwnerComponent>, // It allows the component to close the dialogue and pass data back to the parent component.
    private ownerService: OwnerService,
    private _coreService: CoreService,
    private patientService: PatientService //A reference to the CoreService, which provides general-purpose methods like opening snack bars.
  ) {
    this.ownerForm = this._fb.group({
      name: '',
      address: '',
      pet: '',
    });
    this.patientService.getPatientList().subscribe((data) => {
      this.patients = data;
    });
  }

  ngOnInit(): void {
    this.ownerForm.patchValue(this.data);
  }

  onFormSubmit() {
    this.ownerService
      .getOwnerByName(this.ownerForm.value.name)
      .subscribe((ownersInfo) => {
        if (this.ownerForm.valid) {
          //Get pet of owner
          let patient: Patient = this.patients.find(
            (p) => p.name === this.ownerForm.value.pet
          ) as Patient;

          if (ownersInfo.length > 0) {
            let existingOwner = ownersInfo[0];
            if (patient) {
              existingOwner.pets?.push(patient);
            }
            this.ownerService
              .updateOwner(existingOwner.id, existingOwner as Owner)
              .subscribe({
                next: (val: any) => {
                  this._coreService.openSnackBar('Owner added succesfully ');
                  this._dialogueRef.close(true);
                },
              });
          } else {
            const ownerToAdd = {
              name: this.ownerForm.value.name,
              address: this.ownerForm.value.address,
              pets: [patient],
            } as Owner;

            this.ownerService.addOwner(ownerToAdd as Owner).subscribe({
              next: (val: any) => {
                this._coreService.openSnackBar('Owner added succesfully ');
                this._dialogueRef.close(true);
              },
            });
          }
        }
      });
  }
}
