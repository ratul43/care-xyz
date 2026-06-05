"use server";
import { connectDB } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";


export const postUser = async (payload) => {
  const db = await connectDB();

  const { email, password, name, contact, nid } = payload;

  if (!email || !password) return null;

  const isExist = await db.collection("users").findOne({ email });

  if (isExist) return null;

  const newUser = {
    provider: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    contact,
    nid,
  };

  const result = await db.collection("users").insertOne(newUser);

  return result.acknowledged
    ? { ...result, insertedId: result.insertedId.toString() }
    : null;
}; 


export const loginUser = async (payload) => {
  try {
      const db = await connectDB()

    const { email, password, name } = payload;

    if (!email || !password) return null;

    const user = await db.collection("users").findOne({ email });

    if (!user) return null;

    const isMatched = await bcrypt.compare(password, user.password);

    if (isMatched) {
      return user;
    }
  } catch (error) {
    console.log("AUTHORIZE ERROR:", error);
  }
};

export const bookingsUser = async (data) => {
  try {
    if (!data?.email) return null;

    const db = await connectDB();
    const result = await db.collection("bookings").insertOne({
      ...data,
      createdAt: new Date(),
    });

    if (!result.acknowledged) return null;

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("bookingsUser error:", error);
    return null;
  }
};

export const isAdmin = async (userMail) => {
  try {
      const db = await connectDB()

    if (!userMail) return null;

    const result = await db.collection("users").findOne({
      email: userMail,
      role: "admin",
    });

    // MongoDB document কে plain object-এ convert করুন
    const plainResult = result ? JSON.parse(JSON.stringify(result)) : null;

    console.log(plainResult);
    return plainResult;
  } catch (error) {
    console.error("Admin check failed:", error);
    return null;
  }
};
