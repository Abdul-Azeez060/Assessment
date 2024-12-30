import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, Stethoscope } from "lucide-react";
import { useDoctor } from "../hooks/useDoctor";

export const DoctorProfile: React.FC = () => {
  const doctor = useLocation().state?.doctor;
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { slots, loading, error } = useDoctor(doctor?._id || id);
  console.log(slots, "this is the slots in the main file");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || "Doctor not found"}</p>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  const handleSlotSelect = (slot: any) => {
    navigate(`/booking/${id}/${slot._id}`, { state: { doctor, slot } });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Stethoscope className="w-12 h-12 text-blue-500 mr-4" />
              <div>
                <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
                <p className="text-gray-600 mb-1">
                  {doctor.specialization} • {doctor.experience} years experience
                </p>
                <div className="flex items-center text-gray-600">
                  <span>Consultation Fee: &#8377;{doctor.fee}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/doctors")}
              className="text-blue-500 hover:text-blue-600">
              Back to Doctors
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Available Slots</h3>
          </div>

          {slots.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No available slots</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots?.map((slot) => (
                <button
                  key={slot._id}
                  onClick={() => !slot.isBooked && handleSlotSelect(slot)}
                  disabled={slot.isBooked}
                  className={`p-4 rounded-lg border ${
                    slot.isBooked
                      ? "bg-gray-100 cursor-not-allowed"
                      : "hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  }`}>
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="font-medium">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600"></p>
                  {slot.isBooked && (
                    <span className="text-sm text-red-500 mt-2 block">
                      Booked
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
