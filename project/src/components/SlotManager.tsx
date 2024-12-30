import React, { useState } from "react";
import { Plus, Calendar, Clock } from "lucide-react";
import { format, addDays, set } from "date-fns";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Slot {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const SlotManager = () => {
  const { user } = useAuth();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [message, setMessage] = useState<string>("");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:30");
  const handleAddSlot = async () => {
    setMessage("");
    if (startTime >= endTime) {
      setMessage("End time should be greater than start time");
      return;
    }
    if (
      slots.some((slot) => slot.date === date && slot.startTime === startTime)
    ) {
      setMessage("Slot already exists");
      return;
    }
    const newSlot: Slot = {
      date,
      startTime,
      endTime,
    };
    console.log(user, "this is the user in the slot manager component");
    const res = await axios.post(
      "http://localhost:8000/api/doctor/add-slot",
      { slot: newSlot },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user") as string)
              : ""
          }`,
        },
      }
    );
    if (!res.data.success) {
      setMessage("Could not add slot");
      console.log(res.data.message, "this is the error message");
      return;
    }

    setSlots([...slots, newSlot]);
    setMessage("Slot added successfully");
  };

  const handleDeleteSlot = (id: string) => {
    setSlots(slots.filter((slot) => slot.startTime !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Manage Time Slots</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            min={format(new Date(), "yyyy-MM-dd")}
            max={format(addDays(new Date(), 30), "yyyy-MM-dd")}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleAddSlot}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
        <Plus className="w-4 h-4 mr-2" />
        Add Slot
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <div
            key={slot.startTime + slot.date}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-blue-500 mr-2" />
              <span>{format(new Date(slot.date), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center mb-3">
              <Clock className="w-4 h-4 text-blue-500 mr-2" />
              <span>
                {slot.startTime} - {slot.endTime}
              </span>
            </div>
            <button
              onClick={() => handleDeleteSlot(slot.startTime + slot.date)}
              className="text-red-500 text-sm hover:text-red-600">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
