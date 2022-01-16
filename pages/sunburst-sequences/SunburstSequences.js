import React, { useState, useEffect, RefObject } from 'react'
import * as d3 from 'd3'

function buildHierarchy(csv) {
  const root = { name: 'root', children: [] }
  for (let i = 0; i < csv.length; i++) {
    const sequence = csv[i][0]
    const size = +csv[i][1]
    if (isNaN(size)) {
      continue
    }
    const parts = sequence.split('-')
    let currentNode = root
    for (let j = 0; j < parts.length; j++) {
      const children = currentNode['children']
      const nodeName = parts[j]
      let childNode = null
      if (j + 1 < parts.length) {
        let foundChild = false
        for (let k = 0; k < children.length; k++) {
          if (children[k]['name'] == nodeName) {
            childNode = children[k]
            foundChild = true
            break
          }
        }
        if (!foundChild) {
          childNode = { name: nodeName, children: [] }
          children.push(childNode)
        }
        currentNode = childNode
      } else {
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
    points.push(`${tipWidth},${breadcrumbHeight / 2}`)
  }
  return points.join(' ')
}

export default function SequencesSunburst({ json }) {
  const ref = React.createRef()

  useEffect(() => {
    draw()
  }, [])

  const draw = () => {
    const data = buildHierarchy(json)
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
          return d.depth && d.x1 - d.x0 > 0.001
        })
      )
      .join('path')
      .attr('d', mousearc)
      .on('mouseenter', (event, d) => {
        const sequence = d.ancestors().reverse().slice(1)
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

  return <div ref={ref}></div>
}
