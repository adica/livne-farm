import { SVGProps } from "react";

export function FarmLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <rect x="9" y="14" width="6" height="5" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
      <path d="M12 4v6" />
      <path d="M8 22v-3" />
      <path d="M16 22v-3" />
      <path d="M12 19h-2a2 2 0 0 0-2 2" />
      <path d="M14 19h2a2 2 0 0 1 2 2" />
    </svg>
  );
} 