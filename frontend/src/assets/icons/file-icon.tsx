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
        d="M15.487 5.427l-3.914-3.914A1.738 1.738 0 0010.336 1H4.75A2.752 2.752 0 002 3.75v10.5A2.752 2.752 0 004.75 17h8.5A2.752 2.752 0 0016 14.25V6.664c0-.467-.182-.907-.513-1.237zM5.75 6h2a.75.75 0 010 1.5h-2a.75.75 0 010-1.5zm6.5 7.5h-6.5a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5zm0-3h-6.5a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5zm2.182-4H11.5c-.55 0-1-.45-1-1V2.579l.013-.005 3.922 3.921-.002.005z"
        fill="#currentColor"
        className=""
      />
    </svg>
  )
}

export default SvgComponent
