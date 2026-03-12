"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AuthButtons = () => {

    const session = useSession()    

    // console.log(session.data.user.image);

    // console.log(session?.data?.user?.image);

    return (
        <div>
            {session.status == "authenticated" ? 
             <div className="flex items-center gap-3">
              <img
              // src={session?.data?.user?.image}
                src={session?.data?.user?.image}
                alt="user"
                className="w-8 h-8 rounded-full"
              />

              <button 
                onClick={() => signOut()}
                className="px-3 py-1 cursor-pointer btn bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
     
        :
        
         <>
              <Link
                href="/login"
                className="px-4 py-2 mr-3 border rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
        
        
        
        
        
        
        }
        </div>
        
    );
};

export default AuthButtons;