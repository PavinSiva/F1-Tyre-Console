export default function DriverSelect({ formData, setFormData }) {
  const drivers = [
    { code: "LEC", name: "Charles Leclerc" },
    { code: "HAM", name: "Lewis Hamilton" },
    { code: "NOR", name: "Lando Norris" },
    { code: "PIA", name: "Oscar Piastri" },
    { code: "RUS", name: "George Russell" },
    { code: "SAR", name: "Logan Sargeant" },
    { code: "ALO", name: "Fernando Alonso" },
    { code: "STR", name: "Lance Stroll" },
    { code: "GAS", name: "Pierre Gasly" },
    { code: "COL", name: "Franco Colapinto" },
    { code: "SAI", name: "Carlos Sainz" },
    { code: "ALB", name: "Alex Albon" },
    { code: "OCO", name: "Esteban Ocon" },
    { code: "BEA", name: "Oliver Bearman" },
    { code: "VER", name: "Max Verstappen" },
    { code: "TSU", name: "Yuki Tsunoda" },
    { code: "LAW", name: "Liam Lawson" },
    { code: "DRU", name: "Jack Doohan" },
    { code: "PER", name: "Sergio Perez" },
    { code: "BOT", name: "Valtteri Bottas" },
    { code: "ZHO", name: "Zhou Guanyu" },
    { code: "HUL", name: "Nico Hulkenberg" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-200">
        Select Driver
      </h3>


      <div className="h-[336px] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          {drivers.map((driver) => {
            const selected = formData.Driver === driver.code;

            return (
              <button
                key={driver.code}
                onClick={() =>
                  setFormData({ ...formData, Driver: driver.code })
                }
                className={`relative h-40 rounded-xl overflow-hidden border transition-all
                  ${
                    selected
                      ? "border-red-500 ring-2 ring-red-500 scale-[1.02]"
                      : "border-gray-700 hover:border-gray-500"
                  }
                `}
              >
                <img
                  src={`/src/assets/${driver.code}.png`}
                  alt={driver.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/10" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
