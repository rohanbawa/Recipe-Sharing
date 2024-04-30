import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    user_id: '',
    username: '',
    email: '',
    profile_details: ''
  });

  useEffect(() => {
    // Fetch user data from backend or any source
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Example: Fetch user data from backend API
    const mockUserData = {
      user_id: '1',
      username: 'JohnDoe',
      email: 'john@example.com',
      profile_details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac libero vitae nisi volutpat cursus. Sed venenatis justo sed lacinia semper.'
    };

    setUserData(mockUserData);
  };

  return (
    <div className="home-container">
    <div className="home-background"></div>
    <div className="container mx-auto px-4 py-8">
    <div className="centered-container">
    <div className="recipes-box">
      <h2 className="text-3xl font-semibold mb-4">Profile</h2></div></div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
          <span className="text-gray-700">{userData.user_id}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <span className="text-gray-700">{userData.username}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <span className="text-gray-700">{userData.email}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Details:</label>
          <p className="text-gray-700">{userData.profile_details}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
