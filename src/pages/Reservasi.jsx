import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Reservasi = () => {
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
            max-width: 500px;
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
            background: linear-gradient(135deg, #6366f1, #3730a3);
            color: white;
            font-weight: 600;
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
            background: linear-gradient(135deg, #6366f1, #3730a3) !important;
            color: white !important;
        }
    `;

    return (
        <div className="bg-gray-100 flex flex-col items-center min-h-screen">
            <style>{modernCalendarStyles}</style>
            <div className="w-full max-w-md">
                <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl">
                    <a href="beranda.html" className="text-gray-600 hover:text-gray-800">
                        <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
                    </a>
                    <h1 className="text-2xl font-bold text-gray-800">Reservasi Ruangan</h1>
                    <div className="w-6"></div>
                </header>

                <main className="mt-8 space-y-6">
                    {/* Pilih Tanggal */}
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Pilih Tanggal</h2>
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
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Pilih Ruangan</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {['Cyber', 'TBD', 'Mulmed', 'RPL'].map((room) => (
                                <button
                                    key={room}
                                    className={`
                                        p-4 rounded-lg transition text-left 
                                        ${selectedRoom === room 
                                            ? 'bg-indigo-500 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200'}
                                    `}
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
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Selesai</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-8 w-full px-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-lg font-semibold shadow-md"
                    >
                        Ajukan Reservasi
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Reservasi;