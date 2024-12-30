import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Calendar, Download } from "lucide-react";
import { generateCSV } from "../utils/csv";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface MocAppointments {
  userId: any;
  id: string;
  doctorId: any;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: string;
  fee: Number;
}

export const AppointmentList: React.FC = () => {
  const [mockAppointments, setmockAppointments] = useState<MocAppointments[]>(
    []
  );
  const { user } = useAuth();

  useEffect(() => {
    async function init() {
      const res = await axios.get(`${BACKEND_URL}/user/appointments-history`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user") as string)
              : ""
          }`,
        },
      });
      console.log(res.data.data.history);
      setmockAppointments(res.data.data.history);
    }
    init();
  }, [user]);

  const downloadCSV = () => {
    const data = mockAppointments?.map((apt) => ({
      StartTime: apt.startTime.toString(),
      EndTime: apt.endTime.toString(),
      Doctor: apt.doctorId?.name,
      Patient: apt.userId.name,
      Status: apt.status == "1" ? "Pending" : "Completed",
      Amount: apt.fee,
    }));

    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "appointments.csv";
    if (mockAppointments) {
      a.click();
    }

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <button
          onClick={downloadCSV}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {mockAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border-b last:border-b-0 p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.doctorId.name}
                </h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {appointment.startTime.toString()} •{" "}
                    {appointment.endTime.toString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    appointment.status === "1"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                  {appointment.status == "1" ? "Pending" : "Completed"}
                </span>
                <p className="mt-1 text-gray-600">
                  &#8377; {appointment.fee.toString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
