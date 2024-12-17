import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
<<<<<<< HEAD

const Reservasi = () => {
=======
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';

const Reservasi = () => {
    const navigate = useNavigate();
>>>>>>> FE-RPL
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    const handleSubmit = () => {
        console.log('Reservasi:', {
            date,
            startTime,
            endTime,
            selectedRoom,
        });
    };

    const modernCalendarStyles = `
        .react-calendar {
            width: 100%;
<<<<<<< HEAD
            max-width: 500px;
=======
            max-width: 600px; 
>>>>>>> FE-RPL
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
<<<<<<< HEAD
            background: linear-gradient(135deg, #6366f1, #3730a3);
=======
            background: black;
>>>>>>> FE-RPL
            color: white;
            font-weight: 600;
        }

<<<<<<< HEAD
=======
        .react-calendar__navigation button {
            color: white !important;
        }

>>>>>>> FE-RPL
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
<<<<<<< HEAD
            background: linear-gradient(135deg, #6366f1, #3730a3) !important;
            color: white !important;
        }
=======
            background: black !important;
            color: white !important;
        }

        .react-calendar__tile:hover {
            background-color: #f3f4f6 !important;
        }

        .react-calendar__tile--now {
            background-color: #f0f0f0 !important;
        }
>>>>>>> FE-RPL
    `;

    return (
        <div className="bg-gray-100 flex flex-col items-center min-h-screen">
            <style>{modernCalendarStyles}</style>
<<<<<<< HEAD
            <div className="w-full max-w-md">
                <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl">
                    <a href="beranda.html" className="text-gray-600 hover:text-gray-800">
                        <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
                    </a>
                    <h1 className="text-2xl font-bold text-gray-800">Reservasi Ruangan</h1>
                    <div className="w-6"></div>
                </header>

=======
            <div className="w-full max-w-3xl">
                {/* Header */}
                <header className="bg-white shadow-md rounded-lg mb-8 p-4 flex justify-between items-center">
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Reservasi Ruangan</h1>
                    <div className="w-8"></div>
                </header>

                {/* Main Content */}
>>>>>>> FE-RPL
                <main className="mt-8 space-y-6">
                    {/* Pilih Tanggal */}
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Pilih Tanggal</h2>
<<<<<<< HEAD
                        <Calendar 
                            onChange={setDate} 
                            value={date}
                            className="custom-calendar"
                            minDate={new Date()} 
=======
                        <Calendar
                            onChange={setDate}
                            value={date}
                            className="custom-calendar"
                            minDate={new Date()}
>>>>>>> FE-RPL
                            next2Label={null}
                            prev2Label={null}
                            showNeighboringMonth={false}
                        />
                    </div>

                    {/* Pilih Ruangan */}
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Pilih Ruangan</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {['Cyber', 'TBD', 'Mulmed', 'RPL'].map((room) => (
                                <button
                                    key={room}
                                    className={`
                                        p-4 rounded-lg transition text-left 
<<<<<<< HEAD
                                        ${selectedRoom === room 
                                            ? 'bg-indigo-500 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200'}
                                    `}
=======
                                        ${selectedRoom === room
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'}`}
>>>>>>> FE-RPL
                                    onClick={() => handleRoomSelect(room)}
                                >
                                    {room}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Waktu */}
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Pilih Waktu</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Mulai</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
<<<<<<< HEAD
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
=======
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
>>>>>>> FE-RPL
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Selesai</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
<<<<<<< HEAD
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
=======
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
>>>>>>> FE-RPL
                                />
                            </div>
                        </div>
                    </div>
                </main>

<<<<<<< HEAD
                <footer className="mt-8 w-full px-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-lg font-semibold shadow-md"
=======
                {/* Footer */}
                <footer className="mt-8 w-full px-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
>>>>>>> FE-RPL
                    >
                        Ajukan Reservasi
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Reservasi;