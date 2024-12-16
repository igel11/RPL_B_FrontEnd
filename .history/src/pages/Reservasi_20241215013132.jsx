import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Reservasi = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Menambahkan state untuk error

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleSubmit = async () => {
    const reservationData = {
      userId: 4, // Replace with dynamic user ID if needed
      room: selectedRoom,
      date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      startTime,
      endTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:3500/reservations",
        reservationData
      );
      console.log("Reservasi berhasil:", response.data);
      navigate("/dashboard"); // Optionally navigate or show a success message here
    } catch (error) {
      console.error("Error saat membuat reservasi:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Terjadi kesalahan"); // Set error message
      } else {
        setErrorMessage("Terjadi kesalahan tidak terduga");
      }
    }
  };

  const modernCalendarStyles = `
    .react-calendar {
      width: 100%;
      max-width: 600px;
      background: white;
      border: none;
      font-family: 'Inter', Arial, sans-serif;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-radius: 1rem;
      overflow: hidden;
      margin: 0 auto;
    }

    .react-calendar__navigation {
      height: 50px;
      background: black;
      color: white;
      font-weight: 600;
    }

    .react-calendar__navigation button {
      color: white !important;
    }

    .react-calendar__month-view__days__day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: all 0.3s ease;
      font-size: 1rem;
      padding: 0.5rem;
    }

    .react-calendar__tile--active {
      background: black !important;
      color: white !important;
    }

    .react-calendar__tile:hover {
      background-color: #f3f4f6 !important;
    }

    .react-calendar__tile--now {
      background-color: #f0f0f0 !important;
    }
  `;

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">
      <style>{modernCalendarStyles}</style>
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="bg-white shadow-md rounded-lg mb-8 p-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Reservasi Ruangan
          </h1>
          <div className="w-8"></div>
        </header>

        {/* Main Content */}
        <main className="mt-8 space-y-6">
          {/* Pilih Tanggal */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Pilih Tanggal
            </h2>
            <Calendar
              onChange={setDate}
              value={date}
              className="custom-calendar"
              minDate={new Date()}
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
            />
          </div>

          {/* Pilih Ruangan */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Pilih Ruangan
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Keamanan Cyber",
                "Teknologi Basis Data",
                "Multi Media",
                "Rekayasa Perangkat Lunak",
              ].map((room) => (
                <button
                  key={room}
                  className={`
                    p-4 rounded-lg transition text-left 
                    ${
                      selectedRoom === room
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Waktu */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Pilih Waktu
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Mulai</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Selesai</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 font-semibold text-center">
              {errorMessage}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 w-full px-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Ajukan Reservasi
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Reservasi;
