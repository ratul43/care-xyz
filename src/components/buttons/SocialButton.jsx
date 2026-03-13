import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

const SocialButton = () => {
    const params = useSearchParams()

    // console.log(params.get("callbackUrl") || "/");

    const handleSignIn = async () => {
        await signIn(
            "google",
             {
                // redirect: false,
                 callbackUrl: params.get("callbackUrl") || "/"
                })
        // console.log(result);
        // if(result){
        //     Swal.fire("success", "Welcome", "success")
        // }
        // else{
        //     Swal.fire("error", "Sorry", "error")
        // }
    }


    return (
       <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200 cursor-pointer"
      >
        <FcGoogle className="text-lg" />
        Sign in with Google
      </button>
    </div>
    );
};

export default SocialButton;