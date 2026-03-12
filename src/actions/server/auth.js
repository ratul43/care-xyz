"use server";
import bcrypt from "bcryptjs";

import { collections, dbConnect } from "@/lib/dbConnect";



export const postUser = async (payload) => {
  const { email, password, name, contact, nid } = payload;
  // check payload
  if (!email || !password) return null;

  // check user
  const isExist = await dbConnect(collections.USERS).findOne({ email });
  if (isExist) {
    return null;
  }

  // create user

  const newUser = {
    provider: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    contact, 
    nid 
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

export const loginUser = async (payload) => {

      const { email, password, name } = payload;


      if (!email || !password) return null;

    const user = await dbConnect(collections.USERS).findOne({ email });
    
    if(!user) return null 

    const isMatched = await bcrypt.compare(password, user.password)

    if(isMatched){
        return user
    }
    else{
        return null 
    }


}


export const bookingsUser = async (data) => {

  const result = await dbConnect(collections.BOOKINGS).insertOne(data);

  return result
}


