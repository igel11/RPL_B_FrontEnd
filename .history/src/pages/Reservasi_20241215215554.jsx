import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3500");

const Reservasi = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomStatus, setRoomStatus] = useState(""); // Menambahkan status ruangan
  const [errorMessage, setErrorMessage] = useState(""); // Menambahkan state untuk error

  useEffect(() => {
    // Mendengarkan event untuk status ruangan
    socket.on("roomStatus", (status) => {
      setRoomStatus(status);
    });

    // Mendengarkan event status reservasi
    socket.on("reservationStatus", (status) => {
      if (status.status === "success") {
        alert(`Reservasi berhasil! ID Reservasi: ${status.reservationId}`);
        setRoomStatus(""); // Reset status setelah sukses
      } else {
        alert(`Error: ${status.message}`);
      }
    });

    return () => {
      socket.off("roomStatus");
      socket.off("reservationStatus");
    };
  }, []);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setRoomStatus(""); // Reset status saat memilih ruangan baru
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      alert("Pengguna tidak ditemukan. Silakan login terlebih dahulu.");
      return;
    }

    if (!selectedRoom || !startTime || !endTime) {
      setErrorMessage("Silakan pilih ruangan dan waktu untuk reservasi.");
      return;
    }

    const reservationData = {
      userId,
      room: selectedRoom,
      date: date.toISOString().split("T")[0],
      startTime,
      endTime,
    };

    // Emit event untuk memeriksa ketersediaan ruangan
    socket.emit("checkRoom", reservationData);
    setErrorMessage(""); // Reset error message
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

        <main className="mt-8 space-y-6">
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
                  className={`text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300 transform ${
                    selectedRoom === room
                      ? "bg-green-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Pilih Waktu
            </h2>
            <div className="flex space-x-4">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm p-2">{errorMessage}</div>
          )}

          {roomStatus && (
            <div
              className={`text-white p-4 rounded-lg ${
                roomStatus === "unavailable" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {roomStatus === "unavailable"
                ? "Ruangan tidak tersedia pada waktu yang dipilih."
                : "Ruangan tersedia."}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600"
          >
            Cek Ketersediaan
          </button>
        </main>
      </div>
    </div>
  );
};

export default Reservasi;
