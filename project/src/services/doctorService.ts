import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getDoctorSlots = async (doctorId: string) => {
  // Simulate API call
  console.log("thsi is doctor id in get doctor slots ");
  const res = await axios.get(`${BACKEND_URL}/user/${doctorId}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `${
        localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user") as string)
          : ""
      }`,
    },
  });
  return res.data.data.slots;
};
