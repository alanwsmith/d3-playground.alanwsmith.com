import React, { useEffect, RefObject } from 'react'
import * as d3 from 'd3'
const Rectangle = () => {
  const ref = React.createRef()

  useEffect(() => {
    draw()
  })
  const draw = () => {
    d3.select(ref.current).append('p').text('Hello World')
    d3.select('svg')
      .append('g')
      .attr('transform', 'translate(250, 0)')
      .append('rect')
      .attr('width', 500)
      .attr('height', 500)
      .attr('fill', 'tomato')
  }
  return (
    <div>
      <div>
        This is a super basic example and not necessarily the way I want to do
        it, but it's a start.
      </div>
      <div className="Rectangle" ref={ref}>
        <svg width="500" height="500">
          <g transform="translate(0, 0)">
            <rect width="500" height="500" fill="green" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Rectangle
