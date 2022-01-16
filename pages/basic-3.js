import React, { useEffect, RefObject } from 'react'
import * as d3 from 'd3'

export default function Rectangle() {
  const ref = React.createRef()

  useEffect(() => {
    draw()
  })

  const draw = () => {
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', 200)
      .attr('height', 200)
    svg
      .append('g')
      .append('rect')
      .attr('width', 200)
      .attr('height', 200)
      .attr('fill', 'blue')
  }
  return (
    <div>
      <div>
        This works, but there is an issue where it duplicates, looks like that
        might happen everytime the component is rendered. Might be able to
        useState to set an init to deal with that, but looking to see if
        there&apos;s another way.{' '}
      </div>
      <div ref={ref}></div>
    </div>
  )
}
