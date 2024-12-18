import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, Circle } from "lucide-react";

const steps = ["Basic Info", "Medical Info", "Documents"];

export default function AddRecord() {
  const [loading, setLoading] = useState(true);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const fields = watch();

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
      setDogBreeds((await res_1.json()).data);
      setSymptoms((await res_2.json()).data);
    } catch (err) {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  function nextStep() {
    if (validateCurrentStep()) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else toast.error("Please fill all required fields.");
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  function validateCurrentStep() {
    switch (currentStep) {
      case 0:
        return fields.pet_name && fields.type && fields.age && fields.weight;
      case 1:
        return fields.symptom && fields.medical_history && fields.last_vaccination;
      case 2:
        return fields.emergency_contact;
      default:
        return true;
    }
  }

  async function onSubmit(data) {
    toast.success("Form submitted successfully!");
    console.log(data);
    reset();
    setCompletedSteps([]);
    setCurrentStep(0);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );

  return (
    <Card className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add Pet Health Record
        </h2>
        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {completedSteps.includes(index) ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : index === currentStep ? (
                <Circle className="w-6 h-6 text-blue-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
              <span
                className={`text-xs ${
                  index <= currentStep ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Pet Name"
                  {...register("pet_name", { required: true })}
                  className="input"
                />
                <select
                  {...register("type", { required: true })}
                  className="input"
                >
                  <option value="">Select Breed</option>
                  {dogBreeds.map((breed, idx) => (
                    <option key={idx} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Age"
                  type="number"
                  {...register("age", { required: true })}
                  className="input"
                />
                <input
                  placeholder="Weight"
                  type="number"
                  {...register("weight", { required: true })}
                  className="input"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Medical Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <select
                  {...register("symptom", { required: true })}
                  className="input"
                >
                  <option value="">Select Symptoms</option>
                  {symptoms.map((symptom, idx) => (
                    <option key={idx} value={symptom}>
                      {symptom}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Medical History"
                  {...register("medical_history", { required: true })}
                  className="input col-span-2"
                />
                <input
                  type="date"
                  {...register("last_vaccination", { required: true })}
                  className="input"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Contact and Documents
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Emergency Contact"
                  {...register("emergency_contact", { required: true })}
                  className="input"
                />
                <input
                  type="file"
                  multiple
                  className="input col-span-2"
                  onChange={(e) =>
                    setValue("documents", Array.from(e.target.files))
                  }
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Back
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
