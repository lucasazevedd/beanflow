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
      <path
        d="M13.28 8.47L7.03 2.22a.75.75 0 10-1.061 1.061l5.72 5.72-5.72 5.72a.75.75 0 001.06 1.061l6.25-6.25a.75.75 0 000-1.061z"
        fill="#currentColor"
        className=""
      />
    </svg>
  )
}

export default SvgComponent
