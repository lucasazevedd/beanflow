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
        <circle cx={5.75} cy={6.25} r={2.75} />
        <circle cx={12} cy={3.75} r={2.75} data-color="color-2" />
        <path
          d="M17.196 11.098A5.582 5.582 0 0012 7.5a5.561 5.561 0 00-3.759 1.48c1.854.709 3.385 2.169 4.109 4.089.112.296.162.603.182.91 1.211-.05 2.409-.26 3.565-.646a1.786 1.786 0 001.041-.919c.2-.42.221-.888.059-1.316z"
          data-color="color-2"
        />
        <path d="M10.946 13.598C10.135 11.446 8.047 10 5.75 10S1.365 11.446.554 13.598c-.162.429-.141.896.059 1.316.206.432.585.767 1.041.919a12.926 12.926 0 008.192 0 1.786 1.786 0 001.041-.919c.2-.42.221-.888.059-1.316z" />
      </g>
    </svg>
  )
}

export default SvgComponent
