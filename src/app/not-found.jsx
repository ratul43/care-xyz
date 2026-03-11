import Link from 'next/link';
import React from 'react';

const NotFound = () => {
   return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-md">
        {/* Large 404 Text */}
        <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Oops! Page not found
        </h2>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;