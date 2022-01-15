import React, { useState, useEffect, RefObject } from 'react'
import * as d3 from 'd3'

import csv from './data.json'

function buildHierarchy(csv) {
  const root = { name: 'root', children: [] }
  for (let i = 0; i < csv.length; i++) {
    const sequence = csv[i][0]
    const size = +csv[i][1]
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue
    }
    const parts = sequence.split('-')
    let currentNode = root
    for (let j = 0; j < parts.length; j++) {
      const children = currentNode['children']
      const nodeName = parts[j]
      let childNode = null
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        let foundChild = false
        for (let k = 0; k < children.length; k++) {
          if (children[k]['name'] == nodeName) {
            childNode = children[k]
            foundChild = true
            break
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = { name: nodeName, children: [] }
          children.push(childNode)
        }
        currentNode = childNode
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = { name: nodeName, value: size }
        children.push(childNode)
      }
    }
  }
  return root
}

function breadcrumbPoints(d, i) {
  const tipWidth = 10
  const points = []
  points.push('0,0')
  points.push(`${breadcrumbWidth},0`)
  points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`)
  points.push(`${breadcrumbWidth},${breadcrumbHeight}`)
  points.push(`0,${breadcrumbHeight}`)
  if (i > 0) {
    // Leftmost breadcrumb; don't include 6th vertex.
    points.push(`${tipWidth},${breadcrumbHeight / 2}`)
  }
  return points.join(' ')
}

export default function Rectangle() {
  const [initialized, setInitialized] = useState(false)
  const ref = React.createRef()

  useEffect(() => {
    if (initialized === false) {
      draw()
      setInitialized(true)
    }
  }, [setInitialized])

  const draw = () => {
    const data = buildHierarchy(csv)
    const partition = (data) =>
      d3.partition().size([2 * Math.PI, radius * radius])(
        d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value)
      )
    const color = d3
      .scaleOrdinal()
      .domain(['home', 'product', 'search', 'account', 'other', 'end'])
      .range(['#5d85cf', '#7c6561', '#da7847', '#6fb971', '#9e70cf', '#bbbbbb'])
    const width = 640
    const radius = width / 2
    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle(1 / radius)
      .padRadius(radius)
      .innerRadius((d) => Math.sqrt(d.y0))
      .outerRadius((d) => Math.sqrt(d.y1) - 1)
    const mousearc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => Math.sqrt(d.y0))
      .outerRadius(radius)
    const breadcrumbWidth = 75

    const root = partition(data)

    // const svg = d3.create('svg')
    const svg = d3.select(ref.current).append('svg')
    const element = svg.node()
    element.value = { sequence: [], percentage: 0.0 }
    const label = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#888')
      .style('visibility', 'hidden')
    label
      .append('tspan')
      .attr('class', 'percentage')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '-0.1em')
      .attr('font-size', '3em')
      .text('')
    label
      .append('tspan')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '1.5em')
      .text('of visits begin with this sequence')
    svg
      .attr('viewBox', `${-radius} ${-radius} ${width} ${width}`)
      .style('max-width', `${width}px`)
      .style('font', '12px sans-serif')
    const path = svg
      .append('g')
      .selectAll('path')
      .data(
        root.descendants().filter((d) => {
          // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
          return d.depth && d.x1 - d.x0 > 0.001
        })
      )
      .join('path')
      .attr('fill', (d) => color(d.data.name))
      .attr('d', arc)
    svg
      .append('g')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseleave', () => {
        path.attr('fill-opacity', 1)
        label.style('visibility', 'hidden')
        // Update the value of this view
        element.value = { sequence: [], percentage: 0.0 }
        element.dispatchEvent(new CustomEvent('input'))
      })
      .selectAll('path')
      .data(
        root.descendants().filter((d) => {
          // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
          return d.depth && d.x1 - d.x0 > 0.001
        })
      )
      .join('path')
      .attr('d', mousearc)
      .on('mouseenter', (event, d) => {
        // Get the ancestors of the current segment, minus the root
        const sequence = d.ancestors().reverse().slice(1)
        // Highlight the ancestors
        path.attr('fill-opacity', (node) =>
          sequence.indexOf(node) >= 0 ? 1.0 : 0.3
        )
        const percentage = ((100 * d.value) / root.value).toPrecision(3)
        label
          .style('visibility', null)
          .select('.percentage')
          .text(percentage + '%')
        element.value = { sequence, percentage }
        element.dispatchEvent(new CustomEvent('input'))
      })
  }

  return (
    <div>
      <div>
        This is a Nextjs verion of the sunbusrt from
        https://observablehq.com/@kerryrodden/sequences-sunburst
      </div>
      <div ref={ref}></div>
    </div>
  )
}
