export default function TyreSelect({ formData, setFormData }) {
  const tyres = [
    {
      id: "SOFT",
      label: "Soft",
      img: "src/assets/soft.png",
      border: "border-red-500",
      glow: "shadow-red-500/40",
    },
    {
      id: "MEDIUM",
      label: "Medium",
      img: "src/assets/mid.png",
      border: "border-yellow-400",
      glow: "shadow-yellow-400/40",
    },
    {
      id: "HARD",
      label: "Hard",
      img: "src/assets/hard.png",
      border: "border-gray-400",
      glow: "shadow-gray-400/40",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <label className="text-gray-300 mb-6 text-lg font-semibold">
        Select Tyre Compound
      </label>

      {/* CENTERED + BIGGER CARDS */}
      <div className="flex gap-6 justify-center">
        {tyres.map((t) => {
          const isSelected = formData.Compound === t.id;

          return (
            <div
              key={t.id}
              onClick={() =>
                setFormData({ ...formData, Compound: t.id })
              }
              className={`
                w-56 h-56 cursor-pointer rounded-2xl
                flex flex-col items-center justify-center
                border-2 transition-all duration-200
                bg-zinc-900
                ${isSelected
                  ? `${t.border} shadow-2xl ${t.glow} scale-105`
                  : "border-gray-700 opacity-80 hover:opacity-100"}
                hover:scale-110
              `}
            >
              <img
                src={t.img}
                alt={t.label}
                className="w-24 h-24 object-contain"
              />

              <p className="text-white text-lg mt-4 font-bold tracking-wide">
                {t.label.toUpperCase()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
