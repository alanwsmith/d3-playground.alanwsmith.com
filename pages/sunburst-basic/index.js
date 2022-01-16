import React, { useEffect, RefObject } from 'react'
import * as d3 from 'd3'

export default function Page() {
  return (
    <div>
      <div>
        This page is the start of Next.js version of
        <a href="https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5">
          this tutorial
        </a>
      </div>
      <svg ref={ref}>
        <g transform="translate(0, 0)">
          <rect width="500" height="500" fill="green" />
        </g>
      </svg>
    </div>
  )
}
