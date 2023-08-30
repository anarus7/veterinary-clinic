import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { Appointment } from '../../models/appointments';
import { AppointmentService } from 'app/services/appointment.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [ToastrService],
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    slotDuration: '00:20:00',
    plugins: [dayGridPlugin],
    events: [],
    datesSet: (fetchInfo) => {
      if (!this.appointments) {
        this.loadAppointments();
      }
    },
  };

  appointmentsLoaded: boolean = false;
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource();
  displayedColumns: string[] = [
    'petName',
    'species',
    'reason',
    'date',
    'time',
    'delete',
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadAppointments();
    }, 0);
  }

  appointments: Appointment[] = [];
  petName: string = '';
  date: string = '';
  time: string = '';
  ownerName: string = '';
  reason: string = '';
  species: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {
    this.patientService = patientService;
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  createAppointment(): void {
    if (!this.petName || !this.date) {
      alert('Please fill out all required fields.');
      return;
    }

    const appointment = new Appointment(
      { name: this.petName, species: this.species } as Patient,
      this.date,
      this.time,
      this.ownerName,
      this.reason
    );
    this.appointments.push(appointment);

    const startDateTime = new Date(`${this.date}T${this.time}`);
    const endDateTime = new Date(startDateTime.getTime() + 20 * 60 * 1000);

    if (this.calendarComponent) {
    }

    this.appointmentService.addApp(appointment).subscribe(
      (response) => {
        this.loadAppointments();
        console.log('Appointment created:', response);
        // Add patient to patients file in JSON server
        const patient = response.pet;
        this.patientService.addPatient(patient).subscribe(
          (patientResponse) => console.log('Patient added:', patientResponse),
          (error) => console.error('Error adding patient:', error)
        );
        this.showSuccess;
        // Show success message

        this.toastr.success('Appointment created successfully!', 'Success');
      },
      (error) => console.error('Error creating appointment:', error)
    );

    this.clearForm();
  }

  showSuccess(): void {
    this.toastr.success('Appointment created successfully!', 'Success', {
      toastClass: 'alert alert-success alert-dismissible fade show',
    });
  }

  private clearForm(): void {
    this.petName = '';
    this.date = '';
    this.time = '';
    this.ownerName = '';
    this.reason = '';
  }

  private loadAppointments(): void {
    this.http
      .get<Appointment[]>('http://localhost:3000/appointments')
      .subscribe(
        (appointments) => {
          appointments.sort((a, b) => {
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();
            return aDate - bDate;
          });

          this.appointments = appointments;
          this.dataSource.data = appointments;
          this.calendarComponent.getApi().removeAllEvents();
          appointments.forEach((appointment) => {
            this.calendarComponent.getApi().addEvent({
              title: appointment.pet?.name,
              start: appointment.date,
              end: appointment.date,
              description: appointment.reason,
            });
          });
          this.appointmentsLoaded = true;
        },
        (error) => console.error('Error loading appointments:', error)
      );
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteApp(id).subscribe(() => {
      this.loadAppointments();
    });
  }
}
