// SuccessPage.js

import React from 'react';
import { useParams } from 'react-router-dom';

const SuccessPage = () => {

  const {id} = useParams();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-12 w-12 text-green-500 mx-auto mb-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registration Successful</h2>
        <p className="text-gray-600 mb-6">Thank you for registering! Your account has been created successfully.</p>
        <a href="/" className="text-blue-500 hover:underline">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
