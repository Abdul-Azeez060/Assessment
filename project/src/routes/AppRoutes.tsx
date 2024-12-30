import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Login } from "../components/Login";
import { DoctorList } from "../components/DoctorList";
import { DoctorProfile } from "../components/DoctorProfile";
import { BookingConfirmation } from "../components/BookingConfirmation";
import { AppointmentList } from "../components/AppointmentList";
import { TransactionHistory } from "../components/TransactionHistory";
import { DoctorDashboard } from "../components/DoctorDashboard";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  console.log(user, "this is the user");
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            {user?.type === "doctor" ? (
              <DoctorDashboard />
            ) : (
              <Navigate to="/doctors" />
            )}
          </PrivateRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <PrivateRoute>
            <DoctorList />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctor/:id"
        element={
          <PrivateRoute>
            <DoctorProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctor-dashboard"
        element={
          <PrivateRoute>
            <DoctorDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/booking/:doctorId/:slotId"
        element={
          <PrivateRoute>
            <BookingConfirmation />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <AppointmentList />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <TransactionHistory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
