import fs from 'fs'

import Link from 'next/link'

import SunburstSequences from '../../components/SunburstSequences'
import SourceCode from '../../components/SourceCode'

import json from '../../public/data/sunburst-sequences.json'

export default function Home(props) {
  return (
    <div>
      <h1>D3 Sunburst Sequences For Next.js</h1>
      <p>
        This is a Next.js implementation of the awesome{' '}
        <a href="https://observablehq.com/@kerryrodden/sequences-sunburst">
          D3 Sequences Sunburst
        </a>{' '}
        by <a href="https://twitter.com/kerryrodden">Kerry Rodden</a>. I pulled
        the code out to it&apos;s own component that can be used multiple times
        on a page. It tooks some time to get setup in Next.js. In the interest
        of sharing, here's how to do it.
      </p>
      <h2>The Example</h2>
      <p>
        First off, here&apos;s what the example code below generates to give you
        an idea of what it looks like:
      </p>
      <div className="p-12">
        <SunburstSequences json={json} />
      </div>
      <h2>The Implementation Details</h2>
      <p>Now that you&apos;ve seen it, here&apos;s how to do it:</p>
      <ol>
        <li>
          After creating a basic Next.js app, install D3 with:
          <SourceCode code={`npm install d3`} language="bash" lines={false} />
        </li>
        <li>
          Create a JSON data file with the format like{' '}
          <Link href="/data/sunburst-sequences.json">
            <a>this one</a>
          </Link>{' '}
          and drop it in:
          <SourceCode
            code={`public/data/sunburst-sequences.json`}
            language="bash"
            lines={false}
          />
          (Or, just use this json example to get started)
        </li>
        <li>
          Create a page that will display the visualization at:
          <SourceCode
            code={`pages/sunburst-sequences.js`}
            language="bash"
            lines={false}
          />
          and paste this code into it:
          <SourceCode code={props.code1} language="jsx" />
        </li>
        <li>
          This is the meat of it. Create the file to house the component at:
          <SourceCode
            code={`components/SunburstSequences.js`}
            language="bash"
            lines={false}
          />
          and paste this code into it:
          <SourceCode code={props.code2} language="jsx" />
        </li>
        <li>
          And, that's it. Fire up your site and visit `/sunburst-sequences` to
          see your visualization
        </li>
      </ol>

      <h2>The Notes</h2>

      <ul>
        <li>
          The original version has a breadcrumb. I haven&apos;t implement that
          yet
        </li>
        <li>
          The data in the JSON file is in the same format as that produces by{' '}
          <code>d3.csvParseRows()</code>. You can use it to parse a CSV file to
          feed to generate the JSON to then send to the component.
        </li>
        <li>
          I&apos;m not setting a width or height on the svg element return from
          the component. There is a hard coded width on line 75 though. The
          behavoir I'm seeing is that if the width is set to something larger
          than whatever elemnt the SVG is in, it expandes to fill it up, but
          doesn&apos;t break out of it. If the width is less than the containing
          element, it shrinks down to whatever the defined size is.
        </li>
      </ul>

      <h2>The Wrap-Up</h2>

      <p>
        Getting this to work in Next.js was a decent amount of work. Totally
        worth it. And, since you have this post, you can benefit from the effort
        without having to go through it yourself. That&apos;s one of my favorite
        things about the net.
      </p>
      <p>Enjoy</p>
      <p>
        - <a href="https://twitter.com/TheIdOfAlan">a</a>
      </p>
    </div>
  )
}

export async function getStaticProps(context) {
  const file1 = './pages/example-page-sunburst-sequences.js'
  const file2 = `./components/SunburstSequences.js`
  try {
    const code1 = fs.readFileSync(file1, `utf8`)
    const code2 = fs.readFileSync(file2, `utf8`)
    return {
      props: {
        code1: code1,
        code2: code2,
      },
    }
  } catch (err) {
    return {
      props: {
        code1: `ERROR: ${err}`,
        code2: `ERROR: ${err}`,
      },
    }
  }
}
