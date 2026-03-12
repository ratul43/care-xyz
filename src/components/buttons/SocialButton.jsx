import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SocialButton = () => {
    const params = useSearchParams()

    console.log(params.get("callbackUrl") || "/");

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
        <div>
            <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="btn btn-outline cursor-pointer bg-amber-500 btn-error flex-1"
      >
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
        </div>
    );
};

export default SocialButton;