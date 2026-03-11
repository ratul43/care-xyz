"use server";
import bcrypt from "bcryptjs";

import { collections, dbConnect } from "@/lib/dbConnect";



export const postUser = async (payload) => {
  const { email, password, name } = payload;
  // check payload
  if (!email || !password) return null;

  // check user
  const isExist = await dbConnect(collections.USERS).findOne({ email });
  if (isExist) {
    return null;
  }

  // create user

  const newUser = {
    providerId: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    role: "user",
  };

  // insert user

  const result = await dbConnect(collections.USERS).insertOne(newUser);

  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }
};