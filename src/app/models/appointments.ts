import { Patient } from 'app/models/patient';

export class Appointment {
  pet: Patient;
  date: string;
  time: string;
  ownerName: string = '';
  reason: string = '';

  constructor(
    pet: Patient,
    date: string,
    time: string,
    ownerName: string,
    reason: string
  ) {
    this.pet = pet;
    this.date = date;
    this.time = time;
    this.ownerName = ownerName;
    if (reason) {
      this.reason = reason;
    }
  }

  get start(): string {
    return `${this.date}T${this.time}:00`;
  }

  get end(): string {
    if (!this.date || !this.time) {
      return '';
    }

    const [hour, minute] = this.time.split(':').map(Number);
    const endHour = hour + Math.floor((minute + 20) / 60);
    const endMinute = (minute + 20) % 60;
    const endHourString = String(endHour).padStart(2, '0');
    const endMinuteString = String(endMinute).padStart(2, '0');
    return `${this.date}T${endHourString}:${endMinuteString}:00`;
  }
}
// calculates the end time of an appointment given its start time and date, and returns the end time as an ISO 8601 date-time string.
