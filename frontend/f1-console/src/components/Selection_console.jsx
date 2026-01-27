import { useState } from "react";
import SeasonSelect from "./SeasonSelect.jsx";
import GrandPrixSelect from "./GrandPrixSelect.jsx";
import DriverSelect from "./DriverSelect.jsx";
import RaceModeSelect from "./RaceModeSelect.jsx";
import TyreSelect from "./TyreSelect.jsx";
import RainSelect from "./RainSelect.jsx";

export default function SelectionConsole({
  formData,
  setFormData,
  setPrediction,
  setLoading,
}) {
  const steps = [
    { name: "Season", component: <SeasonSelect formData={formData} setFormData={setFormData} /> },
    { name: "Grand Prix", component: <GrandPrixSelect formData={formData} setFormData={setFormData} /> },
    { name: "Driver", component: <DriverSelect formData={formData} setFormData={setFormData} /> },
    { name: "Race Mode", component: <RaceModeSelect formData={formData} setFormData={setFormData} /> },
    { name: "Tyre Compound", component: <TyreSelect formData={formData} setFormData={setFormData} /> },
    { name: "Rain", component: <RainSelect formData={formData} setFormData={setFormData} /> },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = async () => {
    setLoading(true);
    setPrediction(null);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-6">
      {/* ================= STEP PROGRESS HEADER ================= */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <div key={step.name} className="flex items-center flex-1">
                {/* STEP */}
                <div
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center cursor-pointer select-none"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
                      ${
                        isCompleted
                          ? "bg-red-600 text-white"
                          : isActive
                          ? "bg-red-600 text-white ring-2 ring-red-500 ring-offset-2 ring-offset-zinc-900"
                          : "bg-zinc-700 text-zinc-400"
                      }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  <span
                    className={`text-xs mt-2 font-medium whitespace-nowrap
                      ${
                        isActive || isCompleted
                          ? "text-red-400"
                          : "text-zinc-500"
                      }`}
                  >
                    {step.name}
                  </span>
                </div>

                {/* CONNECTOR */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center">
                    <div
                      className={`h-0.5 w-full mx-3 transition-all
                        ${
                          isCompleted
                            ? "bg-red-600"
                            : "bg-zinc-700"
                        }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= STEP CONTENT ================= */}
      <div className="bg-zinc-900 p-6 rounded-xl min-h-[490px] flex flex-col justify-between">
        {steps[activeStep].component}

        {/* Auto-submit hint */}
        {activeStep === steps.length - 1 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
