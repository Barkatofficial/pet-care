import { useEffect, useState, useTransition } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Pagination from '@mui/material/Pagination';
import Preloader from '@/app/_components/Loader';
import { toast } from 'sonner'
import Link from 'next/link';

export default function RecordList() {
    const [isPending, startTransition] = useTransition();
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchRecords(page)
    }, [page])

    function fetchRecords(page) {
        startTransition(async () => {
            try {
                const res = await GlobalApi.getRecords(page)
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)
                setRecords(data.data)
                // setTotalPages(response.data.meta.pagination.pageCount)
            }
            catch (err) {
                toast.error(err.message)
            }
        })
    }

    const handlePageChange = (event, value) => setPage(value);

    if (isPending) return <Preloader bgHeight="80vh" width="3rem" height="3rem" color="#0D7Dff" />;
    if (!records || records.length === 0) return <p className="text-center">No records found.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm w-full">
            <div className="flex gap-6 flex-wrap">
                {records.map((record, idx) => (
                    <div key={idx} className="p-4 border rounded-lg shadow">
                        <p><strong>Pet Name:</strong> {record.pet_name}</p>
                        <p><strong>Type:</strong> {record.dogBreed}</p>
                        <p><strong>Medical History:</strong> {record.medical_history}</p>

                        {record.age && (
                            <p><strong>Age:</strong> {record.age} years</p>
                        )}
                        {record.weight && (
                            <p><strong>Weight:</strong> {record.weight} kg</p>
                        )}

                        {record.emergency_contact && (
                            <p><strong>Emergency Contact:</strong> {record.emergency_contact}</p>
                        )}


                        {record.symptom && (
                            <p><strong>Symptom:</strong> {record.symptom}</p>
                        )}

                        {record.last_vaccination && (
                            <p><strong>Last Vaccination Date:</strong> {record.last_vaccination}</p>
                        )}

                        {record.next_vaccination && (
                            <p><strong>Next Vaccination Date:</strong> {record.next_vaccination}</p>
                        )}

                        {record.document_link && (
                            <p>
                                <strong>Document URL:</strong>
                                <Link href={record.document_link} target="_blank" rel="noopener noreferrer" className='hover:text-blue-600 mr-2'>{" "}Link</Link>
                            </p>
                        )}

                        {record.pet_documents && (
                            <div className='flex'>
                                <p><strong>Pet Documents:</strong></p>
                                <div className='flex px-2'>
                                    {record.pet_documents.map((item, idx) => (
                                        <Link href={item} key={idx} target="_blank" rel="noopener noreferrer" className='hover:text-blue-600 mr-2'>Link</Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                className="mt-4"
            />
        </div>
    )
}
