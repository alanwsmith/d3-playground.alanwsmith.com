import React, { useState, useEffect, RefObject } from 'react'
import * as d3 from 'd3'

export default function Rectangle() {
  // const [initialized, setInitialized] = useState(false)
  const ref = React.createRef()

  useEffect(() => {
    // if (initialized === false) {
    draw()
    // setInitialized(true)
    // }
  }, [])

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
      .attr('fill', 'red')
  }
  return (
    <div>
      <div>
        Was using `setInitialized(true)`, but if you just pass an empty array it
        only does things one. asdf
      </div>
      <div ref={ref}></div>
    </div>
  )
}
