import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const FormField = ({ label, error, children }) => (
  <div className="flex flex-col space-y-1.5">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const InputField = ({ label, error, placeholder, ...props }) => (
  <FormField label={label} error={error}>
    <input
      placeholder={placeholder}
      className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm shadow-sm transition-colors 
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                 disabled:bg-gray-50 disabled:cursor-not-allowed"
      {...props}
    />
  </FormField>
);

export default function AddRecord() {
  const [loading, setLoading] = useState(true);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  const { control, handleSubmit, register, reset, setValue, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    getDogBreedsAndSymptoms();
  }, []);

  async function getDogBreedsAndSymptoms() {
    setLoading(true);
    try {
      const [res_1, res_2] = await Promise.all([
        GlobalApi.getDogBreeds(),
        GlobalApi.getSymptoms()
      ]);
      const [data_1, data_2] = await Promise.all([
        res_1.json(),
        res_2.json()
      ]);

      if (!res_1.ok || !res_2.ok) throw new Error("Failed to fetch dog breeds and symptoms");

      setDogBreeds(data_1.data);
      setSymptoms(data_2.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load form data");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error("You can only upload a maximum of 3 files");
      e.target.value = "";
      return;
    }
    setValue("documents", files);
  }

  async function onSubmit(data) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "documents" && value !== "") {
        formData.append(key, value);
      }
    });

    if (data.documents) {
      data.documents.forEach((file) => {
        formData.append("documents", file);
      });
    }

    try {
      const res = await GlobalApi.addRecord(formData);
      const responseData = await res.json();

      if (!res.ok) throw new Error(responseData.message);

      toast.success(responseData.message);
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-xl">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: 'Apple Garamond' }}>
          Add Pet Health Record
        </h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: 'Apple Garamond' }}>
          Please fill in all the required information below
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700" style={{ fontFamily: 'Apple Garamond' }}>
                Basic Information
              </h3>
              <InputField
                label="Pet Name"
                type="text"
                placeholder="Enter your pet's name"
                {...register("pet_name", { required: "Pet name is required" })}
                error={errors.pet_name?.message}
              />

              <FormField label="Dog Breed" error={errors.type?.message}>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Breed is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    >
                      <option value="">Select a breed</option>
                      {dogBreeds.map((breed, idx) => (
                        <option key={idx} value={breed}>{breed}</option>
                      ))}
                    </select>
                  )}
                />
              </FormField>

              <InputField
                label="Age (years)"
                type="number"
                placeholder="Enter your pet's age"
                {...register("age", { required: "Age is required" })}
                error={errors.age?.message}
              />

              <InputField
                label="Weight (kg)"
                type="number"
                placeholder="Enter your pet's weight in kg"
                {...register("weight", { required: "Weight is required" })}
                error={errors.weight?.message}
              />
            </div>

            {/* Medical Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700" style={{ fontFamily: 'Apple Garamond' }}>
                Medical Information
              </h3>
              <FormField label="Symptoms" error={errors.symptom?.message}>
                <Controller
                  name="symptom"
                  control={control}
                  rules={{ required: "Symptom is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    >
                      <option value="">Select symptoms</option>
                      {symptoms.map((symptom, idx) => (
                        <option key={idx} value={symptom}>{symptom}</option>
                      ))}
                    </select>
                  )}
                />
              </FormField>

              <FormField label="Medical History" error={errors.medical_history?.message}>
                <textarea
                  placeholder="Provide details about your pet's medical history"
                  {...register("medical_history", { required: "Medical history is required" })}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm min-h-[100px]
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </FormField>

              <InputField
                label="Last Vaccination Date"
                type="date"
                {...register("last_vaccination", { required: "Last vaccination date is required" })}
                error={errors.last_vaccination?.message}
              />

              <InputField
                label="Next Vaccination Date"
                type="date"
                {...register("next_vaccination", { required: "Next vaccination date is required" })}
                error={errors.next_vaccination?.message}
              />
            </div>

            {/* Contact & Documents Section */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-medium text-gray-700" style={{ fontFamily: 'Apple Garamond' }}>
                Contact & Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Emergency Contact"
                  type="text"
                  placeholder="Enter a 10-digit phone number"
                  {...register("emergency_contact", {
                    required: "Emergency contact is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Emergency contact must be 10 digits"
                    }
                  })}
                  error={errors.emergency_contact?.message}
                />

                <InputField
                  label="Document URL"
                  type="url"
                  placeholder="Provide a link to any additional documents"
                  {...register("document_link")}
                  error={errors.document_link?.message}
                />

                <div className="md:col-span-2">
                  <FormField label="Upload Documents" error={errors.documents?.message}>
                    <input
                      type="file"
                      multiple
                      required
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm
                               file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                               file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600
                               hover:file:bg-blue-100 focus:outline-none"
                    />
                  </FormField>
                </div>
              </div>
            </div>
          </div>

          <CardFooter className="px-0 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
                       transition-colors duration-200 hover:bg-blue-700 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                       flex items-center justify-center space-x-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isSubmitting ? 'Adding Record...' : 'Add Record'}</span>
            </button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
