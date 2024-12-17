import React, { useState, useEffect } from "react";
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
  const [reservations, setReservations] = useState([]); // Untuk menyimpan data reservasi yang sudah ada
  const [isRoomAvailable, setIsRoomAvailable] = useState(true); // Untuk memvalidasi apakah ruangan tersedia atau tidak

  // Daftar ruangan yang tersedia
  const availableRooms = [
    "Keamanan Cyber",
    "Teknologi Basis Data",
    "Multi Media",
    "Rekayasa Perangkat Lunak",
  ];

  // Ambil data reservasi yang sudah ada dari backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/reservations");
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  // Cek ketersediaan ruangan pada tanggal dan waktu tertentu
  const checkRoomAvailability = (selectedDate, room, start, end) => {
    const isAvailable = reservations.every((reservation) => {
      const reservationDate = new Date(reservation.date);
      const startTime = new Date(
        `${reservation.date} ${reservation.startTime}`
      );
      const endTime = new Date(`${reservation.date} ${reservation.endTime}`);

      // Cek apakah ruangan yang sama sudah dipesan pada waktu yang sama
      return !(
        reservation.room === room &&
        reservationDate.toDateString() === selectedDate.toDateString() &&
        startTime <= end &&
        endTime >= start
      );
    });
    setIsRoomAvailable(isAvailable);
  };

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

    // Validasi waktu
    if (startTime >= endTime) {
      alert("Waktu mulai harus lebih kecil dari waktu selesai.");
      return;
    }

    if (!selectedRoom) {
      alert("Ruangan sudah dipesan pada waktu tersebut.");
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

    const response = await fetch(
      "http://localhost:3500/api/reservations/add", // URL backend yang sesuai
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      }
    );
    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      navigate("/dashboard");
    } else {
      alert(result.message);
    }
  };

  // Menangani perubahan tanggal pada kalender
  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Cek ketersediaan ruangan setelah tanggal dipilih
    if (selectedRoom) {
      checkRoomAvailability(newDate, selectedRoom, startTime, endTime);
    }
  };

  // Menangani pemilihan ruangan
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    if (date) {
      checkRoomAvailability(date, room, startTime, endTime);
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
              onChange={handleDateChange}
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
              disabled={!isRoomAvailable}
            >
              {isRoomAvailable ? "Ajukan Reservasi" : "Ruangan Tidak Tersedia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservasi;
