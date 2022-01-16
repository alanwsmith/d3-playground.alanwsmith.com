import React, { useState, useEffect, RefObject } from 'react'
import * as d3 from 'd3'

export default function D3Svg({ width, height }) {
  const ref = React.createRef()

  useEffect(() => {
    draw()
  }, [])

  const draw = () => {
    const svg = d3.select(ref.current)
    // Note: this .remove() call prevents
    // issues with Next.js hot reloading
    svg.selectAll('*').remove()
    svg
      .append('g')
      .append('rect')
      .attr('width', 400)
      .attr('height', 100)
      .attr('fill', 'green')
  }

  return <svg width={width} height={height} ref={ref} />
}
