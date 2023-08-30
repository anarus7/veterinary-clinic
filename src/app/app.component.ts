import { Component } from '@angular/core';
import { Patient } from './models/patient';
import { PatientService } from './services/patient.service';
import { scheduled } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Proiect';
}
