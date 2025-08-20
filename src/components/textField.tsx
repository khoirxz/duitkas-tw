interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  compact?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  compact = false,
  placeholder,
  icon,
  required,
  ...props
}) => {
  return (
    <div className="group w-full flex flex-col gap-1 relative">
      {compact
        ? label && (
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 rounded-sm z-10">
              {label} <span className="text-red-500">*</span>
            </label>
          )
        : label && (
            <label className="uppercase block text-sm font-medium text-gray-700 mb-2">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

      <div className="flex flex-row items-center gap-2 rounded-full border group-hover:border-blue-400 group-focus:border-blue-400 border-[#EFEFEF] px-4.5 py-2.5">
        {icon && icon}
        <input
          {...props}
          placeholder={placeholder}
          className="input input-bordered w-full outline-none font-normal text-sm"
        />
      </div>
    </div>
  );
};

export default TextField;
