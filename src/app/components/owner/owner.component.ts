import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddEditOwnerComponent } from '../add-edit-owner/add-edit-owner.component';
import { Owner } from 'app/models/owner';
import { Patient } from 'app/models/patient';
import { CoreService } from 'app/services/core.service';
import { OwnerService } from 'app/services/owner-service';
import { PatientService } from 'app/services/patient.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
})
export class OwnerComponent implements OnInit {
  ownerId: number = 1;
  patients: Patient[] = [];

  dataSource: MatTableDataSource<Owner> = new MatTableDataSource();
  displayedColumns = ['name', 'address', 'pets', 'delete'];
  constructor(
    private _dialog: MatDialog,
    private ownerService: OwnerService,
    private patientService: PatientService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getOwners();
    this.getOwnerAndPatients();
  }

  getOwners() {
    this.ownerService.getOwners().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  getOwnerAndPatients() {
    this.ownerService.getOwner(this.ownerId).subscribe(
      (ownerData) => {
        // set the owner address to a variable
        const ownerAddress = ownerData.address;
        this.patientService.getPatientsByOwnerId(this.ownerId).subscribe(
          (patientsData) => {
            this.patients = patientsData;
            // pass the ownerAddress to the core service to display in the header
            this._coreService.setHeaderData({ title: 'My Title' });
          },
          (error) => {
            console.error('Error fetching patients data:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching owner data:', error);
      }
    );
  }

  openAddEditOwner() {
    const dialogRef = this._dialog.open(AddEditOwnerComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getOwners();
      },
    });
  }

  deleteOwner(id: number) {
    if (confirm('Are you sure you want to delete this owner?')) {
      this.ownerService.deleteOwner(id).subscribe(() => {
        this.getOwners();
        this._coreService.openSnackBar('Owner deleted successfully!');
      });
    }
  }
}
