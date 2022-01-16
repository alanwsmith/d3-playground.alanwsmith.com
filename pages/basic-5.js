import React, { useState, useEffect, RefObject } from 'react'
import * as d3 from 'd3'

export default function Rectangle() {
  return (
    <div>
      this was an old one. does not really need to be used, but clean it up to
      make sure fierst
    </div>
  )

  // const [initialized, setInitialized] = useState(false)
  // const ref = React.createRef()
  // useEffect(() => {
  //   if (initialized === false) {
  //     draw()
  //     setInitialized(true)
  //   }
  // }, [setInitialized])
  // const draw = () => {
  //   const svg = d3
  //     .select(ref.current)
  //     .append('svg')
  //     .attr('width', 200)
  //     .attr('height', 200)
  //   svg
  //     .append('g')
  //     .append('rect')
  //     .attr('width', 200)
  //     .attr('height', 200)
  //     .attr('fill', 'red')
  // }
  // return (
  //   <div>
  //     <div>
  //       This looks like it takes care of the duplication issue via the useState
  //       set of the initalized flag
  //     </div>
  //     <div ref={ref}></div>
  //   </div>
  // )
}
