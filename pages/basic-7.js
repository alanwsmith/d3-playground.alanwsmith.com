import React, { useState, useEffect, RefObject } from 'react'
import * as d3 from 'd3'

export default function Rectangle() {
  const ref = React.createRef()

  function cleanUp() {}

  useEffect(() => {
    draw()

    // const cleanUp = () => {
    //   if (ref.current === null) {
    //     return
    //   }
    //   ;[...ref.current.children].map((child) => {
    //     child.remove()
    //   })
    // }
    // return cleanUp
  })

  const draw = () => {
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'red')
    svg
      .append('g')
      .append('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'green')
  }
  return (
    <div>
      <div>
        this prevents the component from changing on hot relaod and running
        multiple copies.
      </div>
      <div ref={ref}></div>
    </div>
  )
}
