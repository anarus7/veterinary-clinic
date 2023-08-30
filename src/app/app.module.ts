import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { FiltersComponent } from './components/patient-info/filters/filters.component';
import { PatientCreateComponent } from './components/patient-info/patient-list/patient-create.component';
import { InfoComponent } from './components/patient-info/info/info.component';
import { PatientComponent } from './components/patient-info/patient-list/patient/patient.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PatientService } from './services/patient.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddEdditComponent } from './shared/add-eddit/add-eddit.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  MonthAgendaService,
  MonthService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { ToastrModule } from 'ngx-toastr';
import { ContactComponent } from './components/contact/contact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OwnerComponent } from './components/owner/owner.component';
import { AddEditOwnerComponent } from './components/add-edit-owner/add-edit-owner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    PatientInfoComponent,
    FiltersComponent,
    InfoComponent,
    PatientComponent,
    PatientCreateComponent,
    AddEdditComponent,
    FilterByNamePipe,
    DatePickerComponent,
    OwnerComponent,
    ContactComponent,
    AddEditOwnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    RecurrenceEditorModule,
    FullCalendarModule,

    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    DayService,
    WeekService,
    MonthAgendaService,
    MonthService,
    WorkWeekService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
