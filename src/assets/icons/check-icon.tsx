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
      <path
        d="M6.75 15h-.002a.746.746 0 01-.583-.281l-4-5a.749.749 0 111.171-.937l3.418 4.272 7.913-9.776a.75.75 0 111.166.944l-8.5 10.5A.751.751 0 016.75 15z"
        fill="#currentColor"
        className=""
      />
    </svg>
  )
}

export default SvgComponent
