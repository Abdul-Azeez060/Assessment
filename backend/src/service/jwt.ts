import jwt, { Secret } from "jsonwebtoken";
const JWT_SECRET: Secret = process.env.JWT_SECRET_KEY || "default_secret_key";

export function getUser(token: string) {
  try {
    const userObj = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return null;
      }
      return res;
    });
    return userObj;
  } catch (error) {
    return null;
  }
}

export function setUser(id: any, role: string): string | null {
  try {
    const token = jwt.sign(
      {
        id,
        role,
        exp: Math.floor(Date.now() / 1000) + 2 * 7 * 24 * 60 * 60, // 2 weeks
      },
      JWT_SECRET
    );
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    return null;
  }
}
