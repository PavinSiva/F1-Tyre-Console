export default function RaceModeSelect({ formData, setFormData }) {
  const modes = ["PUSH", "BALANCED", "TYRE_SAVING"];

  return (
    <div>
      <label className="text-gray-300 mb-2 block">Select Race Mode</label>
      <select
        value={formData.RaceMode}
        onChange={(e) => setFormData({ ...formData, RaceMode: e.target.value })}
        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
      >
        {modes.map((mode) => (
          <option key={mode} value={mode}>{mode}</option>
        ))}
      </select>
    </div>
  );
}
