"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';

const AuthButtons = () => {
    const session = useSession();

    const handleLogout = async () => {
        await signOut({ redirect: false }); // Don't redirect immediately
        
        Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have been successfully logged out!',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            // Redirect after SweetAlert closes
            window.location.href = '/';
        });
    };

    return (
        <div>
            {session.status === "authenticated" ? (
                <div className="flex items-center gap-3">
                    <img
                        src={session?.data?.user?.image || '/default-avatar.png'}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                    />
                    <button 
                        onClick={handleLogout}
                        className="px-3 py-1 cursor-pointer btn bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default AuthButtons;