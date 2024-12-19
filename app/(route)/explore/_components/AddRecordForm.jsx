import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';

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
      className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
      {...props}
    />
  </FormField>
);

const StepIndicator = ({ steps, currentStep }) => (
  <div className="flex justify-center space-x-4 my-4">
    {steps.map((step, index) => (
      <div key={index} className="flex items-center space-x-2">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentStep > index + 1 ? 'bg-green-500' : 'bg-blue-500'
          } text-white`}
        >
          {currentStep > index + 1 ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            index + 1
          )}
        </div>
        {index < steps.length - 1 && <div className="w-8 h-1 bg-gray-300"></div>}
      </div>
    ))}
  </div>
);

const NavigationButtons = ({ currentStep, steps, setCurrentStep, isSubmitting }) => (
  <div className="flex justify-between mt-6">
    {currentStep > 1 && (
      <button
        type="button"
        onClick={() => setCurrentStep(currentStep - 1)}
        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
      >
        Back
      </button>
    )}

    {currentStep < steps.length ? (
      <button
        type="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    ) : (
      <button
        type="submit"
        className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          'Submit'
        )}
      </button>
    )}
  </div>
);

export default function AddRecord() {
  const [loading, setLoading] = useState(true);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Basic Information', 'Medical Information', 'Contact & Documents'];

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    getDogBreedsAndSymptoms();
  }, []);

  async function getDogBreedsAndSymptoms() {
    setLoading(true);
    try {
      const [res_1, res_2] = await Promise.all([
        GlobalApi.getDogBreeds(),
        GlobalApi.getSymptoms(),
      ]);
      const [data_1, data_2] = await Promise.all([res_1.json(), res_2.json()]);
      if (!res_1.ok || !res_2.ok) throw new Error('Failed to fetch dog breeds and symptoms');
      setDogBreeds(data_1.data);
      setSymptoms(data_2.data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load form data');
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error('You can only upload a maximum of 3 files');
      e.target.value = '';
      return;
    }
    setValue('documents', files);
  }

  async function onSubmit(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'documents' && value !== '') {
        formData.append(key, value);
      }
    });

    if (data.documents) {
      data.documents.forEach((file) => {
        formData.append('documents', file);
      });
    }

    try {
      const res = await GlobalApi.addRecord(formData);
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message);
      toast.success(responseData.message);
      reset();
      setCurrentStep(1);
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
        <h2 className="text-2xl font-semibold text-gray-800">Add Pet Health Record</h2>
        <p className="text-sm text-gray-500">Please fill in all the required information below</p>
      </CardHeader>

      <CardContent>
        <StepIndicator steps={steps} currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Pet Name"
                type="text"
                placeholder="Enter your pet's name"
                {...register('pet_name', { required: 'Pet name is required' })}
                error={errors.pet_name?.message}
              />

              <FormField label="Dog Breed" error={errors.type?.message}>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Breed is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    >
                      <option value="">Select a breed</option>
                      {dogBreeds.map((breed, idx) => (
                        <option key={idx} value={breed}>
                          {breed}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </FormField>

              <InputField
                label="Age (years)"
                type="number"
                placeholder="Enter your pet's age"
                {...register('age', { required: 'Age is required' })}
                error={errors.age?.message}
              />

              <InputField
                label="Weight (kg)"
                type="number"
                placeholder="Enter your pet's weight in kg"
                {...register('weight', { required: 'Weight is required' })}
                error={errors.weight?.message}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Symptoms" error={errors.symptom?.message}>
                <Controller
                  name="symptom"
                  control={control}
                  rules={{ required: 'Symptom is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    >
                      <option value="">Select symptoms</option>
                      {symptoms.map((symptom, idx) => (
                        <option key={idx} value={symptom}>
                          {symptom}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </FormField>

              <FormField label="Medical History" error={errors.medical_history?.message}>
                <textarea
                  placeholder="Provide details about your pet's medical history"
                  {...register('medical_history', { required: 'Medical history is required' })}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </FormField>

              <InputField
                label="Last Vaccination Date"
                type="date"
                {...register('last_vaccination', { required: 'Last vaccination date is required' })}
                error={errors.last_vaccination?.message}
              />

              <InputField
                label="Next Vaccination Date"
                type="date"
                {...register('next_vaccination', { required: 'Next vaccination date is required' })}
                error={errors.next_vaccination?.message}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Emergency Contact"
                type="text"
                placeholder="Enter a 10-digit phone number"
                {...register('emergency_contact', {
                  required: 'Emergency contact is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Emergency contact must be 10 digits',
                  },
                })}
                error={errors.emergency_contact?.message}
              />

              <InputField
                label="Document URL"
                type="url"
                placeholder="Provide a link to any additional documents"
                {...register('document_link')}
                error={errors.document_link?.message}
              />

              <div className="md:col-span-2">
                <FormField label="Upload Documents" error={errors.documents?.message}>
                  <input
                    type="file"
                    multiple
                    required
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:outline-none"
                  />
                </FormField>
              </div>
            </div>
          )}

          <NavigationButtons
            currentStep={currentStep}
            steps={steps}
            setCurrentStep={setCurrentStep}
            isSubmitting={isSubmitting}
          />
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-500">All data is stored securely and confidentially.</p>
      </CardFooter>
    </Card>
  );
}
