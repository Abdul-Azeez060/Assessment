import { Request, Response } from "express";
import { Role } from "../models/WalletModel";
import { Doctor } from "../models/DoctorModel";
import User from "../models/UserModel";
import { setUser } from "../service/jwt";

export async function signUpController(req: Request, res: Response) {
  try {
    // Logic to handle user/doctor sign-up (e.g., validating data, saving to DB, hashing password)
    const data = req.body.data;
    const role = req.body.role;

    if (role == "doctor") {
      await Doctor.create(data);
    } else {
      await User.create(data);
    }

    return res.status(200).json({
      success: true,
      message: `Signed up successfully`,
      data: {}, // Return actual data here
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: { error },
    });
  }
}

export async function signInController(req: Request, res: Response) {
  try {
    // Logic to handle user/doctor sign-in (e.g., validating credentials, generating JWT)
    const data = req.body.data;
    const role = req.body.role;
    let profile = null;
    let token = null;
    if (role == "doctor") {
      profile = await Doctor.findOne({
        phone: data.phone,
      });

      if (!profile) {
        return res.status(401).json({
          success: false,
          message: "User not found",
          data: null,
        });
      }
      token = setUser(profile._id, "doctor");
    } else {
      profile = await User.findOne({
        phone: data.phone,
      });
      if (!profile) {
        return res.status(401).json({
          success: false,
          message: "User not found",
          data: null,
        });
      }
      token = setUser(profile._id, "user");
    }
    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      data: { token },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: { error },
    });
  }
}
