import fs from 'fs'

import Link from 'next/link'

import SunburstSequences from '../../components/SequencesSunburst'
import SourceCode from '../../components/SourceCode'
import MetaData from '../../components/MetaData'

import json from '../../public/data/sequences-sunburst.json'

export default function Home(props) {
  return (
    <div>
      <MetaData
        description="This is how to make the awesome Sequences Sunburst D3 visualization in Next.js"
        image="https://res.cloudinary.com/awsimages/image/upload/w_1200,h_630/c_fit,l_text:Arial_72_bold:Create%20A%20Sequences%20Sunburst%20Data%20Visualization%20With%20D3%20In%20Next.js,co_rgb:c4d4f4,w_1100/fl_layer_apply,g_north_west,x_60,y_220/og-images/d3-playground-main.png"
        title="Create A Sequences Sunburst Data Visualization With D3 In Next.js"
        type="article"
        url="https://d3-playground.alanwsmith.com/sequences-sunburst"
      />
      <h1>D3 Sunburst Sequences For Next.js</h1>
      <p>
        This is a Next.js implementation of the awesome{' '}
        <a href="https://observablehq.com/@kerryrodden/sequences-sunburst">
          D3 Sequences Sunburst
        </a>{' '}
        by <a href="https://twitter.com/kerryrodden">Kerry Rodden</a>. I pulled
        the code out to it&apos;s own component that can be used multiple times
        on a page. It tooks some time to get setup in Next.js. In the interest
        of sharing, here&apos;s how to do it.
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
          <Link href="/data/sequences-sunburst.json">
            <a>this one</a>
          </Link>{' '}
          and drop it in:
          <SourceCode
            code={`public/data/sequences-sunburst.json`}
            language="bash"
            lines={false}
          />
          (Or, just use this json example to get started)
        </li>
        <li>
          Create a page that will display the visualization at:
          <SourceCode
            code={`pages/sequences-sunburst.js`}
            language="bash"
            lines={false}
          />
          and paste this code into it:
          <SourceCode code={props.code1} language="jsx" />
        </li>
        <li>
          This is the meat of it. Create the file to house the component at:
          <SourceCode
            code={`components/SequencesSunburst.js`}
            language="bash"
            lines={false}
          />
          and paste this code into it:
          <SourceCode code={props.code2} language="jsx" />
        </li>
        <li>
          And, that&apos;s it. Fire up your site and visit `/sequences-sunburst`
          to see your visualization
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
          behavoir I&apos;m seeing is that if the width is set to something
          larger than whatever elemnt the SVG is in, it expandes to fill it up,
          but doesn&apos;t break out of it. If the width is less than the
          containing element, it shrinks down to whatever the defined size is.
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
  const file1 = './pages/example-page-sequences-sunburst.js'
  const file2 = `./components/SequencesSunburst.js`
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
