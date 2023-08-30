import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'app/models/patient';
import { CoreService } from 'app/services/core.service';
import { PatientService } from 'app/services/patient.service';
import { AddEdditComponent } from 'app/shared/add-eddit/add-eddit.component';

export interface DropdownOption {
  display: string;
  value: string;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  @Input()
  patientItem!: Patient;
  constructor( private patientService: PatientService,
    private _dialog:MatDialog,
    private coreService: CoreService,
    private liveAnnouncer:LiveAnnouncer

  ){}
  

  ngOnInit(){

  }

  deleteProduct(id: number) {
    this.patientService.deletePatient(id).subscribe({
      next: (rest) => {
        
        this.getPatientList();
      },
      error: console.log,
    });
  }

isVaccinated =new FormControl ('' );
filterValues: any= {
  isVaccinated:'',

};
availableSources: DropdownOption [] = [
  {
    display: 'yes',
    value: 'yes',
  },
  {
    display: 'no',
    value: 'no',
  },
]


  
getPatientList(){
  this.patientService.getPatientList().subscribe({
    next: (res: Patient []) => {
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      this.dataSource.filterPredicate=this.createFilter();
    },
    error: (err) =>console.log(err)
  });
}

private createFilter(): (patient : Patient , filter:string  )=> boolean {
  let filterFunction = function(patient : Patient , filter:string ) : boolean {
    let searchTerms=JSON.parse(filter) ;
    

return patient.isVaccinated.includes(searchTerms.isVaccinated);
  };
  return filterFunction;
}


private clearFilter() {
  this.isVaccinated.setValue('');
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



openEditForm(data: Patient) {
  const dialogRef = this._dialog.open(AddEdditComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getPatientList();
      }
    },
  });
}



announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this.liveAnnouncer.announce('Sorting cleared');
  }
}

}

