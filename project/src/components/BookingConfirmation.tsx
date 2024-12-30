import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Calendar, Clock, Wallet } from "lucide-react";
import { useDiscount } from "../hooks/useDiscount";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const BookingConfirmation = () => {
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  useEffect(() => {
    const getBalance = async () => {
      console.log(localStorage.getItem("user"), "this is the user");
      try {
        const res = await axios.get(`${BACKEND_URL}/user/get-balance`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `${
              localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user") as string)
                : ""
            }`,
          },
        });
        console.log(
          res.data.data.balance.walletBalance,
          "this is the remaining balance"
        );
        setWalletBalance(res.data.data.balance.walletBalance);
      } catch (error) {
        console.log(error, "this is the error");
      }
    };
    getBalance();
  }, []);

  const doctor = useLocation().state?.doctor;
  const slot = useLocation().state?.slot;
  const { doctorId, slotId } = useParams<{
    doctorId: string;
    slotId: string;
  }>();
  const navigate = useNavigate();

  const consultationFee = doctor?.fee || 200;
  const { discount, loading: discountLoading } = useDiscount(
    consultationFee,
    doctorId || ""
  );

  const finalAmount = discount?.hasDiscount
    ? consultationFee * (1 - discount.discountPercentage / 100)
    : consultationFee;

  const handleConfirmBooking = async () => {
    const res = await axios.post(
      `${BACKEND_URL}/payment/verification`,
      {
        amount: finalAmount,
        doctorId,
        slotId,
      },
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
    console.log(res.data.message);
    // Handle booking confirmation and payment
    if (res.data.success) {
      navigate("/appointments");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Booking Confirmation</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-3">Appointment Details</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                <span>{slot.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span>
                  {slot.startTime} AM - {slot.endTime} AM
                </span>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Consultation Fee</span>
                <span>${consultationFee}</span>
              </div>

              {discountLoading ? (
                <div className="flex items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-sm text-gray-600">
                    Checking for discounts...
                  </span>
                </div>
              ) : discount?.hasDiscount ? (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount.discountPercentage}%)</span>
                  <span>
                    -$
                    {(
                      (consultationFee * discount.discountPercentage) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
              ) : null}

              <div className="flex justify-between font-semibold pt-2">
                <span>Total Amount</span>
                <span>${finalAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600 mt-2">
                <span>Wallet Balance</span>
                <span>${walletBalance?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleConfirmBooking}
              disabled={walletBalance != null && walletBalance < finalAmount}
              className={`w-full py-3 px-4 rounded-md flex items-center justify-center ${
                walletBalance != null && walletBalance < finalAmount
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}>
              <CreditCard className="w-5 h-5 mr-2" />
              {walletBalance != null && walletBalance < finalAmount
                ? "Insufficient Balance"
                : "Confirm and Pay"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
