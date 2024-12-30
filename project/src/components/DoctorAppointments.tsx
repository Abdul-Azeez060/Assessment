import React, { useState } from "react";
import { Calendar, Download, User } from "lucide-react";
import { generateCSV } from "../utils/csv";

interface Appointment {
  id: string;
  doctorId?: string;
  userId?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  fee: number;
  date: string;
  time: string;
}

export const DoctorAppointments: React.FC = () => {
  const [mockAppointments, setMockAppointments] = useState<Appointment[]>([]);
  const downloadCSV = () => {
    const data = mockAppointments.map((apt) => ({
      Date: apt.date,
      Time: apt.time,
      Patient: apt.userId,
      Status: apt.status,
      Amount: apt.fee,
    }));

    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "appointments.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <button
          onClick={downloadCSV}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </button>
      </div>

      <div className="space-y-4">
        {mockAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border rounded-lg p-4 hover:border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="font-medium">{appointment.userId}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {appointment.date} • {appointment.time}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    appointment.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                  {appointment.status}
                </span>
                <p className="mt-1 text-gray-600">${appointment.fee}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
