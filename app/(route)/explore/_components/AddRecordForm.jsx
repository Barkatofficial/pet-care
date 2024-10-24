import React, { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import GlobalApi from '@/app/_utils/GlobalApi';

const AddRecordForm = ({ user }) => {
    const fileRef = useRef(null);
    const [isPending, startTransition] = useTransition();

    const [type, setType] = useState('');
    const [petName, setPetName] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [symptom, setSymptom] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [Emergency_contact, setEmergencyContact] = useState('');
    const [petDocuments, setPetDocuments] = useState(null);
    const [documentLink, setDocumentURL] = useState('');
    const [lastVaccinationDate, setLastVaccinationDate] = useState('');
    const [nextVaccinationDate, setNextVaccinationDate] = useState('');

    const handleFileChange = (e) => setPetDocuments(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user?.email) {
            toast.error("User email is not available. Please ensure you're logged in.", {
                style: { backgroundColor: '#dc3545', color: 'white' },
            });
            return;
        }

        if (!type || !petName || !medicalHistory || !symptom || !age || !weight || !Emergency_contact) {
            toast.error("Please fill in all required fields.", {
                style: { backgroundColor: '#dc3545', color: 'white' },
            });
            return;
        }

        let data = {
            type,
            petName,
            email: user.email,
            medicalHistory,
            symptom,
            age,
            weight,
            Emergency_contact,
            lastVaccinationDate,
            nextVaccinationDate
        };

        if (documentLink !== "") {
            Object.assign(data, { documentLink });
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        if (petDocuments) {
            formData.append("files.petDocuments", petDocuments);
        }

        try {
            startTransition(async () => {
                const response = await GlobalApi.addRecord(formData);

                if (response.status === 200) {
                    toast.success(`Record for ${petName} added successfully!`, {
                        style: { backgroundColor: '#28a745', color: 'white' },
                    });
                    resetForm();
                } else {
                    toast.error('Failed to add record. Please try again.', {
                        style: { backgroundColor: '#dc3545', color: 'white' },
                    });
                }
            });
        } catch (error) {
            toast.error('Failed to add record. Please try again.', {
                style: { backgroundColor: '#dc3545', color: 'white' },
            });
        }
    };

    const resetForm = () => {
        fileRef.current.value = '';
        setType('');
        setPetName('');
        setMedicalHistory('');
        setSymptom('');
        setAge('');
        setWeight('');
        setEmergencyContact('');
        setPetDocuments(null);
        setDocumentURL('');
        setLastVaccinationDate('');
        setNextVaccinationDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white py-8 px-20 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Add Pet Health Record</h2>

            <div>
                <label className="block text-gray-700">Select Dog Breed</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                >
                    <option value="">Select a breed</option>
                    <option value="Labrador Retriever">Labrador Retriever</option>
                    <option value="German Shepherd">German Shepherd</option>
                    <option value="Bulldog">Bulldog</option>
                    <option value="Poodle">Poodle</option>
                    <option value="Beagle">Beagle</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="Husky">Husky</option>
                    <option value="Indian Breed">Indian Breed</option>
                    <option value="Street Dog">Street Dog</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-700">Pet Name</label>
                <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    required
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Medical History</label>
                <textarea
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    required
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Symptoms</label>
                <select
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    required
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                >
                    <option value="">Select a symptom</option>
                    <option value="Coughing">Coughing</option>
                    <option value="Sneezing">Sneezing</option>
                    <option value="Vomiting">Vomiting</option>
                    <option value="Diarrhea">Diarrhea</option>
                    <option value="Lethargy">Lethargy</option>
                    <option value="Loss of Appetite">Loss of Appetite</option>
                    <option value="No Symptoms">No Symptoms</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-700">Age (years)</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Weight (kg)</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Emergency Contact</label>
                <input
                    type="text"
                    value={Emergency_contact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    required
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Last Vaccination Date</label>
                <input
                    type="date"
                    value={lastVaccinationDate}
                    onChange={(e) => setLastVaccinationDate(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Next Vaccination Date</label>
                <input
                    type="date"
                    value={nextVaccinationDate}
                    onChange={(e) => setNextVaccinationDate(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Upload Document</label>
                <input
                    ref={fileRef}
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Document URL (Optional)</label>
                <input
                    type="url"
                    value={documentLink}
                    onChange={(e) => setDocumentURL(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <button
                type="submit"
                className={`w-full py-3 mt-6 text-white rounded-lg ${
                    isPending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={isPending}
            >
                {isPending ? 'Adding Record...' : 'Add Record'}
            </button>
        </form>
    );
};

export default AddRecordForm;
