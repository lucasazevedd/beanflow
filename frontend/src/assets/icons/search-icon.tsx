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
      <g fill="#212121" className="nc-icon-wrapper">
        <path
          d="M15.25 16a.744.744 0 01-.53-.22l-3.965-3.965a.75.75 0 111.061-1.061l3.965 3.965a.75.75 0 01-.53 1.281z"
          data-color="color-2"
        />
        <path d="M7.75 13.5C4.58 13.5 2 10.92 2 7.75S4.58 2 7.75 2s5.75 2.58 5.75 5.75-2.58 5.75-5.75 5.75zm0-10C5.407 3.5 3.5 5.407 3.5 7.75S5.407 12 7.75 12 12 10.093 12 7.75 10.093 3.5 7.75 3.5z" />
      </g>
    </svg>
  )
}

export default SvgComponent
