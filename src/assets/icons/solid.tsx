import { type IconProps } from "./outline";

export const HelpIcon: React.FC<IconProps> = ({
  width = "24",
  height = "24",
  color = "#000000",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "24"}
    height={height || "24"}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <path
      fill={color}
      fillRule="evenodd"
      d="M22 12.8c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10m-8.441-4.339c-.972-1.296-3-.967-3.512.57l-.335 1.006a.75.75 0 0 1-1.424-.474l.336-1.006c.895-2.685 4.437-3.26 6.134-.996a3.51 3.51 0 0 1-.166 4.416l-.919 1.05a3.73 3.73 0 0 0-.923 2.456v.317a.75.75 0 0 1-1.5 0v-.317c0-1.267.46-2.49 1.294-3.444l.92-1.05a2.01 2.01 0 0 0 .095-2.528M12 19.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      clipRule="evenodd"></path>
  </svg>
);
export const GraphSolidIcon: React.FC<IconProps> = ({
  width = "24",
  height = "24",
  color = "#000000",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "24"}
    height={height || "24"}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <path
      fill={color}
      d="M18 13.499c1.105 0 2.022.906 1.779 1.983a8.999 8.999 0 0 1-17.606-.227A9 9 0 0 1 9.016 4.72C10.094 4.477 11 5.394 11 6.5v2a5 5 0 0 0 5 5z"></path>
    <path
      fill={color}
      d="M14 5.033c0-1.952 1.64-3.596 3.444-2.85a9 9 0 0 1 4.87 4.872c.748 1.803-.896 3.444-2.848 3.444H18.5a4.5 4.5 0 0 1-4.5-4.5z"></path>
  </svg>
);
export const AddSquareSolidIcon: React.FC<IconProps> = ({
  width = "24",
  height = "24",
  color = "#000000",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "24"}
    height={height || "24"}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <path
      fill={color}
      fillRule="evenodd"
      d="M3.955 5.061C3 6.375 3 8.251 3 12s0 5.625.955 6.939a5 5 0 0 0 1.106 1.106C6.375 21 8.251 21 12 21s5.625 0 6.939-.955a5 5 0 0 0 1.106-1.106C21 17.625 21 15.749 21 12s0-5.625-.955-6.939a5 5 0 0 0-1.106-1.106C17.625 3 15.749 3 12 3s-5.625 0-6.939.955A5 5 0 0 0 3.955 5.06M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
      clipRule="evenodd"></path>
  </svg>
);
