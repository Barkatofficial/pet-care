import React, { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import GlobalApi from '@/app/_utils/GlobalApi';

const DogBreeds = {
    "Labrador Retriever": "LABRADOR_RETRIEVER",
    "German Shepherd": "GERMAN_SHEPHERD",
    "Bulldog": "BULLDOG",
    "Poodle": "POODLE",
    "Beagle": "BEAGLE",
    "Golden Retriever": "GOLDEN_RETRIEVER",
    "Husky": "HUSKY",
    "Indian Breed": "INDIAN_BREED",
}

const Symptoms = {
    "Coughing": "COUGHING",
    "Sneezing": "SNEEZING",
    "Vomiting": "VOMITING",
    "Diarrhea": "DIARRHEA",
    "Lethargy": "LETHARGY",
    "Loss of Appetite": "LOSS_OF_APPETITE",
}

export default function AddRecordForm() {
    const fileRef = useRef(null);
    const [isPending, startTransition] = useTransition();

    const [type, setType] = useState('');
    const [petName, setPetName] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [symptom, setSymptom] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [petDocuments, setPetDocuments] = useState(null);
    const [documentLink, setDocumentURL] = useState('');
    const [lastVaccinationDate, setLastVaccinationDate] = useState('');
    const [nextVaccinationDate, setNextVaccinationDate] = useState('');

    const handleFileChange = (e) => setPetDocuments(e.target.files[0]);

    function handleSubmit(e) {
        e.preventDefault();

        if (!type || !petName || !medicalHistory || !symptom || !age || !weight || !emergencyContact) {
            toast.error("Please fill in all required fields.")
            return
        }

        let data = {
            type,
            pet_name: petName,
            medical_history: medicalHistory,
            symptom,
            last_vaccination: lastVaccinationDate,
            next_vaccination: nextVaccinationDate,
            age,
            weight,
            emergency_contact: emergencyContact,
        };

        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })

        if (documentLink !== "") {
            formData.append("document_link", documentLink)
        }

        if (petDocuments) {
            formData.append("documents", petDocuments);
        }

        startTransition(async () => {
            try {
                const res = await GlobalApi.addRecord(formData);
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)

                toast.success(data.message)
            }
            catch (err) {
                toast.error(err.message)
            }
            finally {
                resetForm()
            }
        })
    }

    function resetForm() {
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
                    {Object.entries(DogBreeds).map(([key, value]) => (
                        <option key={key} value={value}>
                            {key}
                        </option>
                    ))}
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
                    {Object.entries(Symptoms).map(([key, value]) => (
                        <option key={key} value={value}>
                            {key}
                        </option>
                    ))}
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
                    value={emergencyContact}
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
                    required
                    onChange={handleFileChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700">Document URL</label>
                <input
                    type="url"
                    required
                    value={documentLink}
                    onChange={(e) => setDocumentURL(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <button
                type="submit"
                className={`w-full py-3 mt-6 text-white rounded-lg ${isPending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                disabled={isPending}
            >
                {isPending ? 'Adding Record...' : 'Add Record'}
            </button>
        </form>
    );
};
