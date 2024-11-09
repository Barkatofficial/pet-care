"use client"
import React, { useState } from 'react';
import RecordList from './RecordList';
import AddRecordForm from './AddRecordForm';

const Dashboard = () => {
    const [view, setView] = useState("form");

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md mt-10 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Pet Health Dashboard</h1>
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    onClick={() => setView("form")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Add Record
                </button>
                <button
                    onClick={() => setView("records")}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                    View Records
                </button>
            </div>
            <div className="w-full justify-center flex p-6">
                {view === 'form' && <AddRecordForm user={user} />}
                {view === 'records' && <RecordList user={user} />}
            </div>
        </div>
    );
};

export default Dashboard;
