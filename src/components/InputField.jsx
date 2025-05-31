const InputField = ({ icon, ...props }) => (
    <div className="relative">
      <FontAwesomeIcon icon={icon} className="absolute left-4 top-3.5 text-amber-700" />
      <input
        {...props}
        className="w-full pl-12 pr-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition-all text-sm"
        required
      />
    </div>
  );
  export default InputField;