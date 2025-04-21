import { SVGProps } from "react";

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={18}
      width={18}
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="#currentColor" className="nc-icon-wrapper">
        <path d="M15.75 12.5c-.689 0-1.25-.561-1.25-1.25V6.5C14.5 3.467 12.033 1 9 1S3.5 3.467 3.5 6.5v4.75c0 .689-.561 1.25-1.25 1.25a.75.75 0 000 1.5h13.5a.75.75 0 000-1.5z" />
        <path
          d="M10.2 15H7.801a.5.5 0 00-.489.603C7.485 16.425 8.18 17 9.001 17s1.516-.575 1.689-1.397a.5.5 0 00-.489-.603z"
          data-color="color-2"
        />
      </g>
    </svg>
  )
}

export default SvgComponent
