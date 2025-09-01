import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  endLabel?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  compact?: boolean;
  error?: boolean;
  ErrorMessage?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  endLabel,
  compact = false,
  placeholder,
  icon,
  required,
  error = false,
  ErrorMessage,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1 relative">
      {compact
        ? label && (
            <label
              htmlFor={props.id}
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

      <div
        className={
          cn(
            props.disabled
              ? "cursor-not-allowed bg-gray-200 border-gray-200"
              : "border-blue-400/40"
          ) +
          " flex flex-row items-center gap-2 rounded-full border px-4.5 py-2.5 h-10"
        }>
        {icon && (
          <span className="aspect-square flex items-center">{icon}</span>
        )}
        <input
          {...props}
          placeholder={placeholder}
          className={
            cn(props.disabled ? "cursor-not-allowed" : "") +
            " w-full outline-none font-normal text-sm" +
            (compact ? " ml-1.5" : "") +
            ` ${props.className}`
          }
        />
      </div>

      {endLabel && (
        <span className="absolute right-4 transform -translate-y-1/2 top-1/2 text-sm">
          {endLabel}
        </span>
      )}

      {error && (
        <span className="text-xs text-red-500 absolute -bottom-[18px] left-4">
          {ErrorMessage || "This field is required."}
        </span>
      )}
    </div>
  );
};

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  compact?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  compact = false,
  placeholder,
  icon,
  ...props
}) => {
  return (
    <div
      className={
        cn(
          props.disabled
            ? "cursor-not-allowed bg-gray-200 border-gray-200"
            : "cursor-pointer border-blue-400/40"
        ) + " w-full flex flex-col gap-1 relative pl-4 border rounded-lg"
      }>
      {compact
        ? label && (
            <label
              htmlFor="textarea"
              className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 rounded-sm z-10">
              {label} <span className="text-red-500">*</span>
            </label>
          )
        : label && (
            <label className="uppercase block text-sm font-medium text-gray-700 mb-2">
              {label}
              <span className="text-red-500 ml-1">*</span>
            </label>
          )}

      {icon && (
        <div className="absolute left-4 top-3">
          <span>{icon}</span>
        </div>
      )}

      <textarea
        id="textarea"
        className="w-full h-40 p-3 resize-none outline-none ml-3.5 text-sm"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
