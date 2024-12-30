import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Doctor } from "../types";
import { Stethoscope } from "lucide-react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const DoctorList: React.FC = () => {
  const [mockDoctors, setMockDoctors] = useState<Doctor[] | []>([]);

  async function main() {
    try {
      console.log(localStorage.getItem("user"), "this is the user");
      const response = await axios.get(`${BACKEND_URL}/user/get-doctors`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user") as string)
              : ""
          }`,
        },
      });
      console.log(response.data.data.doctors, "this is the response");
      setMockDoctors(response.data.data.doctors);
    } catch (error) {
      console.log(error, "this is the error");
    }
  }

  useEffect(() => {
    main();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDoctors?.map((doctor: Doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              navigate(`/doctor/${doctor._id}`, { state: { doctor } });
            }}>
            <div className="flex items-center mb-4">
              <Stethoscope className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Specialization:</span>{" "}
                {doctor.specialization}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Experience:</span>{" "}
                {doctor.experience} years
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Consultation Fee:</span> &#8377;
                {doctor.fee}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
