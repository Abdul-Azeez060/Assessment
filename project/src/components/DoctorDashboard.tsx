import React, { useEffect, useState } from "react";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { WalletBalance } from "./WalletBalance";
import { SlotManager } from "./SlotManager";

import { useAuth } from "../context/AuthContext";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const DoctorDashboard = () => {
  const { user } = useAuth();
  console.log(user, "this is the user");
  interface Doctor {
    walletBalance: number;
    fee?: number;
    // Add other properties of the doctor object here
  }

  const [doctor, setDoctor] = useState<Doctor | null>(null);

  async function init() {
    try {
      const res = await axios.get(`${BACKEND_URL}/doctor/get-details`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${user}`,
        },
      });
      console.log(
        res.data.data.doctor,
        "this is the response from the backend"
      );
      setDoctor(res.data.data.doctor);
    } catch (error) {
      console.log(error, "this is the error");
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {doctor ? (
          <WalletBalance balance={doctor.walletBalance} />
        ) : (
          <div>Loading</div>
        )}

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold">Today's Appointments</h3>
          </div>
          <span className="text-2xl font-bold">5</span>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold">Today's Earnings</h3>
          </div>
          <span className="text-2xl font-bold">$750</span>
        </div>
      </div>

      <div className="space-y-8">{doctor?.fee && <SlotManager />}</div>
    </div>
  );
};
