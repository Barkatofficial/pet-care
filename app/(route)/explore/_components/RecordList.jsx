import React, { useEffect, useState, useTransition } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Pagination from '@mui/material/Pagination';
import Preloader from '@/app/_components/Loader';
import Link from 'next/link';

export default function RecordList({ user }) {
    const [isPending, startTransition] = useTransition();
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchRecords = (page) => {
        try {
            startTransition(async () => {
                if (user?.email) {
                    const response = await GlobalApi.getRecord(user.email, page);
                    setRecords(response.data.data);
                    console.log(response.data.data);
                    setTotalPages(response.data.meta.pagination.pageCount);
                }
            });
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords(page);
    }, [user, page]);

    const handlePageChange = (event, value) => setPage(value);

    if (isPending) return <Preloader bgHeight="80vh" width="3rem" height="3rem" color="#0D7Dff" />;
    if (!records || records.length === 0) return <p className="text-center">No records found.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm w-full">
            <div className="flex gap-6 flex-wrap">
                {records.map((record, idx) => (
                    <div key={idx} className="p-4 border rounded-lg shadow">
                        <p><strong>Pet Name:</strong> {record.attributes.petName}</p>
                        <p><strong>Type:</strong> {record.attributes.type}</p>
                        <p><strong>Medical History:</strong> {record.attributes.medicalHistory}</p>

                        {/* Additional Fields: Age, Weight */}
                        {record.attributes.age && (
                            <p><strong>Age:</strong> {record.attributes.age} years</p>
                        )}
                        {record.attributes.weight && (
                            <p><strong>Weight:</strong> {record.attributes.weight} kg</p>
                        )}

                        {/* Additional Field: Emergency Contact */}
                        {record.attributes.Emergency_contact && (
                            <p><strong>Emergency Contact:</strong> {record.attributes.Emergency_contact}</p>
                        )}


                        {record.attributes.symptom && (
                            <p><strong>Symptom:</strong> {record.attributes.symptom}</p>
                        )}


                        {/* Vaccination Dates */}
                        {record.attributes.lastVaccinationDate && (
                            <p><strong>Last Vaccination Date:</strong> {record.attributes.lastVaccinationDate}</p>
                        )}
                        {record.attributes.nextVaccinationDate && (
                            <p><strong>Next Vaccination Date:</strong> {record.attributes.nextVaccinationDate}</p>
                        )}

                        {/* Documents: petDocuments (from Strapi) */}
                        {record.attributes.petDocuments?.data?.[0]?.attributes?.url && (
                            <p>
                                <strong>Document:</strong>
                                <Link
                                    href={record.attributes.petDocuments.data[0].attributes.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline ml-2"
                                >
                                    Download
                                </Link>
                            </p>
                        )}

                        {/* External document link */}
                        {record.attributes.documentLink && (
                            <p><strong>Document URL:</strong> <Link href={record.attributes.documentLink} target="_blank" rel="noopener noreferrer">{record.attributes.documentLink}</Link></p>
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
    );
};
