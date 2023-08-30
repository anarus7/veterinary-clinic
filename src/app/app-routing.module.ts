import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ContactComponent } from './components/contact/contact.component';
import { OwnerComponent } from './components/owner/owner.component';

const routes: Routes = [
  { path: '', component: PatientInfoComponent },
  { path: 'patients', component: PatientInfoComponent },
  { path: 'calendar', component: DatePickerComponent },
  {path: 'contact', component:ContactComponent},
  {path: 'owners', component:OwnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
