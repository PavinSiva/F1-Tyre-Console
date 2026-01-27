export default function RainSelect({ formData, setFormData }) {
  return (
    <div>
      <label className="text-gray-300 mb-2 block">Rain Condition</label>
      <select
        value={formData.Rain}
        onChange={(e) =>
          setFormData({ ...formData, Rain: Number(e.target.value) })
        }
        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>
    </div>
  );
}
