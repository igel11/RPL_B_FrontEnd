import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://placehold.co/200x200"
  );
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [userName, setUserName] = useState(
    localStorage.getItem("name") || "Guest"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "Unknown"
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("email") || "guest@example.com"
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleBackClick = () => navigate("/dashboard");

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl">
          <button
            onClick={handleBackClick}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Profil</h1>
          <div className="w-6"></div>
        </header>

        <main className="mt-8 flex flex-col items-center space-y-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profil"
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full"
            >
              <i className="fas fa-camera"></i>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {userName}
            </h2>
            <hr className="border-gray-200 mb-4" />
            <div className="space-y-4">
              <div>
                <label className="text-lg font-medium">Nama</label>
                <input
                  type="text"
                  defaultValue={userName}
                  className="w-full p-2 border rounded-md mt-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  value={userEmail}
                  className="w-full p-2 border rounded-md mt-2 bg-gray-100"
                  readOnly
                />
              </div>
              <div>
                <label className="text-lg font-medium">Peran</label>
                <input
                  type="text"
                  value={userRole}
                  className="w-full p-2 border rounded-md mt-2 bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
