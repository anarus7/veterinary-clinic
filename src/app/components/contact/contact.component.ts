import { Component } from '@angular/core';
import { EmailService } from './email-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private emailService: EmailService) {}

  sendEmail() {
    this.emailService.sendEmail(this.name, this.email, this.message).subscribe({
      next: (response) => {
        alert('Email sent successfully');
      },
      error: (error: any) => {
        console.error(error);
        alert('Error sending email');
      },
    });
  }
}


// sends an HTTP POST request to a backend API endpoint