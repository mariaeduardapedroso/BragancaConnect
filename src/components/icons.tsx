import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.1,1.7c-2.3,0-4.3,1.3-5.3,3.2c-0.6,1.1-0.9,2.4-0.9,3.8c0,0.4,0,0.8,0.1,1.2" />
      <path d="M9,8.7c-2.1,0.2-3.8,1.9-4,4c-0.2,2.1,1.2,4,3.3,4.4" />
      <path d="M8.3,17.1c1.5,0.8,3.2,1.3,4.9,1.3c2.9,0,5.6-1.5,7.1-3.9c1.5-2.4,1.8-5.3,0.8-8.1" />
      <path d="M12.2,12.5c1.4,0.3,2.8-0.3,3.8-1.4c1-1.1,1.4-2.5,1.1-3.9" />
      <path d="M3.7,11.3c-1.3-1.8-1.5-4.2-0.5-6.2c1-2,2.8-3.3,5-3.5" />
      <path d="M15.5 16.5c.5.5 1.2 1 2 1.5" />
      <path d="M15.5 14.5c.8.8 1.8 1.5 2.8 2" />
    </svg>
  ),
};
