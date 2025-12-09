import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      <path d="M12 12H8a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4" />
      <path d="M12 8H9a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h3" />
      <path d="M15.5 13.5c-1 0-2.2.5-3.5 1.5" />
      <path d="M15.5 8.5c-1 0-2.2.5-3.5 1.5" />
      <path d="M18 12a4 4 0 0 1-4 4" />
      <path d="M18 12a4 4 0 0 0-4-4" />
    </svg>
  ),
};
