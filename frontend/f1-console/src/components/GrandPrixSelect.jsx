import { useState } from "react";

const GP_LIST = [
  { name: "Bahrain", img: "/src/assets/bahrain.png" },
  { name: "Saudi Arabian", img: "/src/assets/saudi.png" },
  { name: "Australian", img: "/src/assets/australia.png" },
  { name: "Azerbaijan", img: "/src/assets/azerbaijan.png" },
  { name: "Miami", img: "/src/assets/miami.png" },
  { name: "Emilia Romagna", img: "/src/assets/canada.png" },
  { name: "Monaco", img: "/src/assets/monaco.png" },
  { name: "Spanish", img: "/src/assets/spain.png" },
  { name: "Canadian", img: "/src/assets/canada.png" },
  { name: "Austrian", img: "/src/assets/austria.png" },
  { name: "British", img: "/src/assets/british.png" },
  { name: "Hungarian", img: "/src/assets/hungary.png" },
  { name: "Belgian", img: "/src/assets/belgium.png" },
  { name: "Dutch", img: "/src/assets/dutch.png" },
  { name: "Italian", img: "/src/assets/italy.png" },
  { name: "Singapore", img: "/src/assets/singapore.png" },
  { name: "Japanese", img: "/src/assets/japan.png" },
  { name: "Qatar", img: "/src/assets/qatar.png" },
  { name: "United States", img: "/src/assets/us.png" },
  { name: "Mexican", img: "/src/assets/mexico.png" },
  { name: "Brazilian", img: "/src/assets/brazil.png" },
  { name: "Las Vegas", img: "/src/assets/lasvegas.png" },
  { name: "Abu Dhabi", img: "/src/assets/abudhabi.png" },
];

export default function GrandPrixSelect({ formData, setFormData }) {
  const [hoveredGP, setHoveredGP] = useState(GP_LIST[0]);

  return (
    <div className="flex justify-center">
        <div className="w-[800px] h-[380px] bg-black p-1 flex justify-center rounded-xl ">

        
      <div className="w-[750px] h-[360px] bg-black border border-hidden rounded-xl flex gap-2 overflow-hidden">

        <div className="w-3/4 h-full overflow-y-auto p-3 space-y-2">
          {GP_LIST.map((gp) => {
            const selected = formData.GrandPrix === gp.name;

            return (
              <div
                key={gp.name}
                onMouseEnter={() => setHoveredGP(gp)}
                onClick={() =>
                  setFormData({ ...formData, GrandPrix: gp.name })
                }
                className={`cursor-pointer px-4 py-3 rounded-lg transition-all
                  ${
                    selected
                      ? "bg-red-500/20 border border-red-500"
                      : "bg-black hover:bg-zinc-700"
                  }
                `}
              >
                <p className="text-white font-medium">{gp.name}</p>
              </div>
            );
          })}
        </div>

        {/* RIGHT – IMAGE PREVIEW (25%) */}
        <div className="w-1/4 h-full bg-black flex items-center justify-center border-0">
          {hoveredGP && (
            <img
              src={hoveredGP.img}
              alt={hoveredGP.name}
              className="max-w-full max-h-full object-contain opacity-90"
            />
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
