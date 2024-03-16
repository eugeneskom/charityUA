import React from 'react';

const UserAccount = () => {
  return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-96">
            <div className="flex items-center mb-6">
              <img
                className="h-16 w-16 rounded-full object-cover mr-4"
                src="https://via.placeholder.com/64"
                alt="Profile"
              />
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-600">@john_doe</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 font-bold mb-2">Email</p>
              <p className="text-gray-600">john@example.com</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 font-bold mb-2">Location</p>
              <p className="text-gray-600">New York, USA</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 font-bold mb-2">Bio</p>
              <p className="text-gray-600">
                I'm a software engineer passionate about building great products.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Edit Profile
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Change Password
              </a>
            </div>
          </div>
        </div>
  );
};

export default UserAccount;