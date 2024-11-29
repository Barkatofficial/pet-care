"use client"
import { useEffect, useState } from 'react';
import RecordList from './RecordList';
import AddRecordForm from './AddRecordForm';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

function Dashboard() {
    const router = useRouter();
    const initialView = useSearchParams().get('view') || 'form';

    const [view, setView] = useState(initialView);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('view', view);
        const newURL = `${window.location.pathname}?${queryParams.toString()}`;
        router.push(newURL);
    }, [view, router]);

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md mt-10 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Pet Health Dashboard</h1>
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    onClick={() => setView("form")}
                    className={`px-6 py-3 rounded-lg transition duration-300 ${view === 'form' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    Add Record
                </button>
                <button
                    onClick={() => setView("records")}
                    className={`px-6 py-3 rounded-lg transition duration-300 ${view === 'records' ? 'bg-green-700 text-white' : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                >
                    View Records
                </button>
            </div>
            <div className="w-full justify-center flex p-6">
                {view === 'form' && <AddRecordForm />}
                {view === 'records' && <RecordList />}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Dashboard), { loading: () => <p>Loading Dashboard...</p> });
