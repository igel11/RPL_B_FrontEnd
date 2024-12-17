import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";

const Reservasi = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  // Daftar ruangan yang tersedia
  const availableRooms = [
    "Keamanan Cyber",
    "Teknologi Basis Data",
    "Multi Media",
    "Rekayasa Perangkat Lunak",
  ];

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mengambil data pengguna dari localStorage
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (!name || !role) {
      alert("Informasi pengguna hilang. Silakan login terlebih dahulu.");
      return;
    }

    // Data yang akan dikirim ke backend
    const reservationData = {
      date: date.toISOString().split("T")[0],
      startTime,
      endTime,
      room: selectedRoom,
      name,
      role,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/reservations/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setDate(new Date());
        setStartTime("");
        setEndTime("");
        setSelectedRoom("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengajukan reservasi.");
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
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
    .react-calendar__month-view__days__day {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: all 0.3s ease;
      font-size: 1rem;
    }
    .react-calendar__tile--active {
      background: black !important;
      color: white !important;
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

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pilih Tanggal */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Pilih Tanggal
            </h2>
            <Calendar
              onChange={setDate}
              value={date}
              minDate={new Date()}
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
            />
          </div>

          {/* Pilih Ruangan */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Pilih Ruangan
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {availableRooms.map((room) => (
                <button
                  key={room}
                  type="button"
                  className={`p-4 rounded-lg text-left ${
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
          <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Waktu Mulai</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Waktu Selesai</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="px-6">
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Ajukan Reservasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservasi;
