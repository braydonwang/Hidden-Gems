export default function Input({
  htmlFor,
  name,
  type,
  autoC,
  label,
  value,
  handleChange,
  width = "w-full",
  isDisabled = false,
}) {
  return (
    <div className={width}>
      <label
        htmlFor={htmlFor}
        className="block text-base font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoC}
          required
          disabled={isDisabled}
          value={value}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
