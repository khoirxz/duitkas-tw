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
export const AddCircleSolidIcon: React.FC<IconProps> = ({
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
    viewBox="0 0 17 17"
    {...props}>
    <path
      d="M8.5 16.932A8.333 8.333 0 108.5.266a8.333 8.333 0 000 16.666zM9.125 6.1a.625.625 0 00-1.25 0v1.875H6a.625.625 0 100 1.25h1.875v1.875a.625.625 0 001.25 0V9.224H11a.625.625 0 100-1.25H9.125V6.099z"
      fill={color}
      fillRule="evenodd"
    />
  </svg>
);
export const DeleteSolidIcon: React.FC<IconProps> = ({
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
      d="m18.255 14.665.262-1.885q.121-.868.22-1.597c.135-1 .203-1.5-.096-1.841C18.34 9 17.828 9 16.8 9H7.199c-1.027 0-1.54 0-1.84.342-.298.342-.231.841-.096 1.84.065.487.14 1.017.22 1.598l.262 1.885c.285 2.048.428 3.073.73 3.895.565 1.539 1.542 2.685 2.709 3.177C9.807 22 10.538 22 12 22s2.193 0 2.816-.263c1.167-.492 2.144-1.638 2.709-3.177.302-.822.445-1.847.73-3.895M10.75 11a.75.75 0 0 0-1.5 0v8a.75.75 0 0 0 1.5 0zm4 0a.75.75 0 0 0-1.5 0v8a.75.75 0 0 0 1.5 0z"
      clipRule="evenodd"></path>
    <path
      fill={color}
      d="M12 1.25A4.75 4.75 0 0 0 7.25 6v.25H4a.75.75 0 0 0 0 1.5h16a.75.75 0 0 0 0-1.5h-3.25V6A4.75 4.75 0 0 0 12 1.25"></path>
  </svg>
);
export const EditSolidIcon: React.FC<IconProps> = ({
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
      d="M13.41 19.501a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zM14.204 4.576l.09.052c.778.449 1.427.823 1.902 1.19.502.387.9.831 1.066 1.453s.044 1.206-.196 1.792c-.168.407-.413.864-.71 1.385l-.635-.378-.008-.004-6.925-3.999-.648-.381c.3-.512.57-.948.837-1.293.387-.501.831-.9 1.453-1.066s1.206-.044 1.792.196c.555.229 1.204.603 1.982 1.052M7.389 6.984 3.91 13.008c-.298.515-.534.922-.62 1.385-.088.463-.017.927.073 1.515l.025.16c.166 1.09.303 1.99.51 2.672.215.714.547 1.331 1.2 1.708.654.378 1.355.357 2.08.187.695-.162 1.542-.493 2.57-.895l.15-.059c.555-.216.993-.386 1.35-.693.357-.308.592-.715.89-1.23l3.469-6.01-.649-.386-6.93-4z"></path>
  </svg>
);
export const FilterSolidIcon: React.FC<IconProps> = ({
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
      d="M3.25 5a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M11.25 5a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5h-8a.75.75 0 0 1-.75-.75M15.25 12a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M3.25 12a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75M3.25 19a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M11.25 19a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5h-8a.75.75 0 0 1-.75-.75"></path>
  </svg>
);
