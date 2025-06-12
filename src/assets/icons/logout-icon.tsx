import { SVGProps } from "react";

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.014 13.694a.959.959 0 00-.959.959v3.194a.32.32 0 01-.319.32H3.961L6.165 16.8a2.224 2.224 0 001.057-1.9V6.1c0-.779-.396-1.49-1.057-1.9L3.961 2.835h6.775a.32.32 0 01.32.32v3.193a.959.959 0 001.916 0V3.153A2.239 2.239 0 0010.736.917H2.43A2.239 2.239 0 00.194 3.153v14.694a2.239 2.239 0 002.236 2.236h8.306a2.238 2.238 0 002.236-2.236v-3.194a.959.959 0 00-.958-.959z"
        fill="currentColor"
      />
      <path
        d="M19.719 9.823l-3.514-3.514a.959.959 0 10-1.356 1.356l1.878 1.878h-5.352a.959.959 0 000 1.917h5.352l-1.878 1.878a.959.959 0 001.355 1.356l3.513-3.514a.959.959 0 000-1.356l.002-.001z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgComponent
