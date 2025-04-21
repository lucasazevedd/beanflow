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
        <path d="M16.925 7.898a.751.751 0 00-1.487.204A6.508 6.508 0 019 15.5c-3.584 0-6.5-2.916-6.5-6.5a6.508 6.508 0 017.398-6.438.749.749 0 10.203-1.486 8.107 8.107 0 00-1.102-.075C4.589 1 1 4.589 1 9s3.589 8 8 8 8-3.589 8-8c0-.368-.025-.739-.075-1.102z" />
        <path
          d="M16.366 1.634c-.723-.723-1.984-.723-2.707 0L6.96 8.333c-.646.646-.877 2.058-.956 2.841a.753.753 0 00.821.822c.784-.08 2.195-.309 2.842-.956l6.7-6.7a1.92 1.92 0 000-2.707z"
          data-color="color-2"
        />
      </g>
    </svg>
  )
}

export default SvgComponent
