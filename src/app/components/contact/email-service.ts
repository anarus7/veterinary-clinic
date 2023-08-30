import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, message: string) {
    const url = 'http://localhost:4000/send-email'; 
    const emailData = {
      name,
      email,
      message,
    };

    return this.http.post(url, emailData);
  }
}

