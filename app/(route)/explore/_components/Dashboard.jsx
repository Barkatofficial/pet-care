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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 py-6 px-8">
                    <h1 className="text-4xl font-semibold text-center text-white">Pet Health Dashboard</h1>
                </div>
                <div className="flex justify-center space-x-4 py-6 border-b border-gray-200">
                    <button
                        onClick={() => setView("form")}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            view === 'form' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        Add Record
                    </button>
                    <button
                        onClick={() => setView("records")}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            view === 'records' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        View Records
                    </button>
                </div>
                <div className="p-8">
                    {view === 'form' && <AddRecordForm />}
                    {view === 'records' && <RecordList />}
                </div>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Dashboard), { loading: () => <p>Loading Dashboard...</p> });
