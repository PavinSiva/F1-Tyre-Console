export default function SeasonSelect({ formData, setFormData }) {
  return (
    <div>
      <label className="text-zinc-300 mb-2 block">Select Season Year</label>
      <input
        type="number"
        value={formData.Year}
        onChange={(e) =>
          setFormData({ ...formData, Year: Number(e.target.value) })
        }
        className="w-full p-3 rounded bg-zinc-700 border border-zinc-600 text-white"
      />
    </div>
  );
}
