const Input = ({ label, placeholder, onChange,value,type = "text" }) => (
  <input
    type={type}
      value={value}
      onChange={onChange}
    placeholder={placeholder || label}
    className="w-full px-4 py-2 text-lg rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
);
export default Input;
