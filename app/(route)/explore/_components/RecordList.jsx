import { useEffect, useState, useTransition } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Pagination from '@mui/material/Pagination';
import Preloader from '@/app/_components/Loader';
import { toast } from 'sonner';
import Link from 'next/link';

export default function RecordList() {
    const [isPending, startTransition] = useTransition();
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchRecords(page);
    }, [page]);

    function fetchRecords(page) {
        startTransition(async () => {
            try {
                const res = await GlobalApi.getRecords(page);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message);
                setRecords(data.data);
                setTotalPages(data.meta?.pagination?.pageCount || 1); // Example total pages logic
            } catch (err) {
                toast.error(err.message);
            }
        });
    }

    const handlePageChange = (event, value) => setPage(value);

    if (isPending) return <Preloader bgHeight="80vh" width="3rem" height="3rem" color="#0D7Dff" />;
    if (!records || records.length === 0) return <p className="text-center">No records found.</p>;

    return (
        <div className="bg-gray-50 p-8 rounded-xl shadow-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pet Records</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map((record, idx) => (
                    <div key={idx} className="bg-white p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
                        <p className="text-gray-700 mb-2"><strong className="font-medium">Pet Name:</strong> {record.pet_name}</p>
                        <p className="text-gray-700 mb-2"><strong className="font-medium">Type:</strong> {record.dogBreed}</p>
                        <p className="text-gray-700 mb-2"><strong className="font-medium">Medical History:</strong> {record.medical_history}</p>

                        {record.age && (
                            <p className="text-gray-700 mb-2"><strong className="font-medium">Age:</strong> {record.age} years</p>
                        )}
                        {record.weight && (
                            <p className="text-gray-700 mb-2"><strong className="font-medium">Weight:</strong> {record.weight} kg</p>
                        )}

                        {record.emergency_contact && (
                            <p className="text-gray-700 mb-2"><strong className="font-medium">Emergency Contact:</strong> {record.emergency_contact}</p>
                        )}

                        {record.symptom && (
                            <p className="text-gray-700 mb-2"><strong className="font-medium">Symptom:</strong> {record.symptom}</p>
                        )}

                        {record.last_vaccination && (
                            <p className="text-gray-700 mb-2"><strong className="font-medium">Last Vaccination Date:</strong> {record.last_vaccination}</p>
                        )}

                        {record.next_vaccination && (
                            <p className="text-gray-700 mb-2"><strong className="font-medium">Next Vaccination Date:</strong> {record.next_vaccination}</p>
                        )}

                        {record.document_link && (
                            <p className="text-gray-700 mb-2">
                                <strong className="font-medium">Document URL:</strong>
                                <Link href={record.document_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Link</Link>
                            </p>
                        )}

                        {record.pet_documents && (
                            <div className="text-gray-700 mb-2">
                                <strong className="font-medium">Pet Documents:</strong>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {record.pet_documents.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Document {idx + 1}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    className="pagination"
                />
            </div>
        </div>
    );
}
