import { SVGProps } from "react";

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={32}
      width={32}
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="#currentColor" className="nc-icon-wrapper">
        <path
          d="M17 5.75A2.752 2.752 0 0014.25 3H3.75A2.752 2.752 0 001 5.75v.75h16v-.75z"
          data-color="color-2"
        />
        <path d="M1 12.25A2.752 2.752 0 003.75 15h10.5A2.752 2.752 0 0017 12.25V8H1v4.25zm11.75-1.75h1a.75.75 0 010 1.5h-1a.75.75 0 010-1.5zm-8.5 0h3a.75.75 0 010 1.5h-3a.75.75 0 010-1.5z" />
      </g>
    </svg>
  )
}

export default SvgComponent
