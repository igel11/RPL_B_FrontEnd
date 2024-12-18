import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservationForm = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const availableRooms = [
    "Keamanan Cyber",
    "Teknologi Basis Data",
    "Multi Media",
    "Rekayasa Perangkat Lunak",
  ];

  // Ambil data nama dan role dari localStorage
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }

    const reservationData = {
      date,
      startTime,
      endTime,
      room,
      name,
      role,
    };

    try {
      const response = await fetch("http://localhost:3500/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();
      if (data.message === "Reservasi berhasil dibuat!") {
        alert("Reservasi berhasil!");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat membuat reservasi.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Room</label>
        <select value={room} onChange={(e) => setRoom(e.target.value)} required>
          <option value="">Select Room</option>
          {availableRooms.map((roomOption) => (
            <option key={roomOption} value={roomOption}>
              {roomOption}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReservationForm;
