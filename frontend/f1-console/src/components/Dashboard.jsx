import { useState } from "react";
import SelectionConsole from "./Selection_console.jsx";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    Year: 2027,
    GrandPrix: "Bahrain",
    Driver: "VER",
    Compound: "SOFT",
    RaceMode: "BALANCED",
    TrackTemp: 45,
    AirTemp: 30,
    Rain: 0
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-5 py-6">


    <header className="relative mb-6 border-b border-zinc-800 pb-6 overflow-hidden rounded-xl">


  <img
    src="/src/assets/bg_top.png" 
    alt="F1 background"
    className="absolute inset-0 w-full h-full object-cover opacity-50"
  />

  {/* DARK OVERLAY (for readability) */}
  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/40" />

  {/* TEXT CONTENT */}
  <div className="relative z-10 px-4 pt-4">
    <h1 className="text-4xl font-extrabold tracking-wide">
      🏎️ F1 Stint Strategy Dashboard
    </h1>
    <p className="text-zinc-400 mt-1">
      Tyre degradation & stint length prediction system
    </p>
  </div>

</header>



      <div className="flex gap-6">
        <div className="w-[70%]">
          <SelectionConsole
            formData={formData}
            setFormData={setFormData}
            setPrediction={setPrediction}
            setLoading={setLoading}
          />
        </div>

        <div className="w-[30%] bg-zinc-900 border border-zinc-700 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4"> Prediction Output</h2>

            {!prediction && (
              <p className="text-gray-500 text-sm">
                Submit race parameters to view predicted stint length.
              </p>
            )}

            {prediction && (
              <>
                <p className="text-gray-400 text-sm">Driver</p>
                <p className="text-lg font-semibold mb-2">{formData.Driver}</p>

                <p className="text-gray-400 text-sm">Grand Prix</p>
                <p className="text-lg font-semibold mb-4">{formData.GrandPrix}</p>

                <div className="mt-4 bg-zinc-950 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-sm">Predicted Stint Length</p>
                  <p className="text-4xl font-extrabold text-red-500 mt-2">
                    {prediction.predicted_stint_length}
                    <span className="text-lg ml-1">laps</span>
                  </p>
                </div>
              </>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-6">
            ML-powered strategy prediction • F1 Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
