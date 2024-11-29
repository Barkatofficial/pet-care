import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import GlobalApi from '@/app/_utils/GlobalApi';

export default function AddRecord() {
    const [loading, setLoading] = useState(true)
    const [dogBreeds, setDogBreeds] = useState([])
    const [symptoms, setSymptoms] = useState([])

    const { control, handleSubmit, register, reset, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        getDogBreedsAndSymptoms()
    }, [])

    async function getDogBreedsAndSymptoms() {
        setLoading(true)
        try {
            const [res_1, res_2] = await Promise.all([
                GlobalApi.getDogBreeds(),
                GlobalApi.getSymptoms()
            ])
            const [data_1, data_2] = await Promise.all([
                res_1.json(),
                res_2.json()
            ])

            if (!res_1.ok || !res_2.ok) throw new Error("Failed to fetch dog breeds and symptoms")

            setDogBreeds(data_1.data)
            setSymptoms(data_2.data)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    function handleFileChange(e) {
        const files = Array.from(e.target.files)
        if (files.length > 3) {
            toast.error("You can only upload a maximum of 3 files")
            e.target.value = ""
            return
        }
        setValue("documents", files)
    }

    async function onSubmit(data) {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (key !== "documents" && value !== "") {
                formData.append(key, value)
            }
        })

        if (data.documents) {
            data.documents.map((file) => {
                formData.append("documents", file)
            })
        }

        try {
            const res = await GlobalApi.addRecord(formData);
            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            toast.success(data.message)
            reset()
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white py-8 px-20 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Add Pet Health Record</h2>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4">
                {/* Left Section (6 fields) */}
                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Pet Name</label>
                    <input
                        type="text"
                        {...register("pet_name", { required: "Pet name is required" })}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.pet_name && <p className="text-red-500">{errors.pet_name.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Select Dog Breed</label>
                    <Controller
                        name="type"
                        disabled={loading}
                        control={control}
                        rules={{ required: "Breed is required" }}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="">Select a breed</option>
                                {dogBreeds.map((item, idx) => (
                                    <option key={idx} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Symptoms</label>
                    <Controller
                        name="symptom"
                        disabled={loading}
                        control={control}
                        rules={{ required: "Symptom is required" }}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="">Select a symptom</option>
                                {symptoms.map((item, idx) => (
                                    <option key={idx} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.symptom && <p className="text-red-500">{errors.symptom.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Medical History</label>
                    <textarea
                        {...register("medical_history", { required: "Medical history is required" })}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.medical_history && <p className="text-red-500">{errors.medical_history.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Age (years)</label>
                    <input
                        type="number"
                        {...register("age", { required: "Age is required" })}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Weight (kg)</label>
                    <input
                        type="number"
                        {...register("weight", { required: "Weight is required" })}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
                </div>

                {/* Right Section (5 fields) */}
                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Emergency Contact</label>
                    <input
                        type="text"
                        {...register("emergency_contact", {
                            required: "Emergency contact is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Emergency contact must be 10 digits"
                            }
                        })}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.emergency_contact && <p className="text-red-500">{errors.emergency_contact.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Last Vaccination Date</label>
                    <input
                        type="date"
                        {...register("last_vaccination", { required: "Last vaccination date is required" })}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.last_vaccination && <p className="text-red-500">{errors.last_vaccination.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Next Vaccination Date</label>
                    <input
                        type="date"
                        {...register("next_vaccination", { required: "Next vaccination date is required" })}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {errors.next_vaccination && <p className="text-red-500">{errors.next_vaccination.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Upload Document</label>
                    <input
                        type="file"
                        multiple
                        required
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        onChange={handleFileChange}
                    />
                    {errors.documents && <p className="text-red-500">{errors.documents.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-gray-700">Document URL</label>
                    <input
                        type="url"
                        {...register("document_link")}
                        className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
            </div>

            <button
                type="submit"
                className={`w-full py-3 mt-6 text-white rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Adding Record...' : 'Add Record'}
            </button>
        </form>
    )
}
