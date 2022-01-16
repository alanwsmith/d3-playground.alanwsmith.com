import React, { useState, useEffect, RefObject } from 'react'
import * as d3 from 'd3'

export default function Rectangle() {
  const ref = React.createRef()

  useEffect(() => {
    draw()
  })

  const draw = () => {
    const svg = d3.select(ref.current).attr('width', 100).attr('height', 100)
    svg.selectAll('*').remove()
    svg
      .append('g')
      .append('rect')
      .attr('width', 25)
      .attr('height', 25)
      .attr('fill', 'yellow')
  }
  return (
    <div>
      <div>
        This clears the svg and rebuilds it on intial load and hot refresh.
        Looks like the basic way to run things for D3
      </div>
      <svg className="bg-gray-300" ref={ref}></svg>
    </div>
  )
}
