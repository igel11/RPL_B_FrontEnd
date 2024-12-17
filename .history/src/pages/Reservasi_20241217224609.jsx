import React, { useState } from "react";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    room: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (!name || !role) {
      alert("User information is missing. Please login first.");
      return;
    }

    const reservationData = {
      ...formData,
      name,
      role,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/reservations/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ date: "", startTime: "", endTime: "", room: "" });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengajukan reservasi.");
    }
  };

  return (
    <div className="reservation-form">
      <h2>Ajukan Reservasi Ruangan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="room"
          placeholder="Nama Ruangan"
          value={formData.room}
          onChange={handleChange}
          required
        />
        <button type="submit">Ajukan Reservasi</button>
      </form>
    </div>
  );
};

export default ReservationPage;
