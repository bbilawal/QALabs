export default function TextField({
  type = "text",
  value,
  onChange,
  placeholder,
  rows = 1,
}) {
  if (rows > 1) {
    return (
      <textarea
        className="w-full p-4 rounded bg-gray-800 text-white mb-6"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <input
      type={type}
      className="w-full p-4 rounded bg-gray-800 text-white mb-6"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}