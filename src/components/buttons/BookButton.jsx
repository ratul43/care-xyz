"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const BookButton = ({id}) => {

    const session = useSession() 

      const isLogin = session?.status == "authenticated";

    const router = useRouter()
   
    const path = usePathname()



    const bookServiceBtn = () =>{
        if(isLogin) {}
            else{
        router.push(`/login?callbackUrl=${path}`)
            }
   
        

        }



    return (
        <button onClick={bookServiceBtn} className='btn'>
             <Link
            href={`/booking/${id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Book This Service
          </Link>
        </button>
    );
};

export default BookButton;