export interface User {
  id: string;
  name: string;
  phone: string;
  type: "user" | "doctor";
}

export interface Doctor extends User {
  _id?: string;
  specialization: string;
  experience: number;
  fee: number;
  currentAppointments: TimeSlot[];
}

export interface TimeSlot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  userId?: string;
  fee?: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  slotId: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
  date: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  date: string;
}
