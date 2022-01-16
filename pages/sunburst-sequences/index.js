import fs from 'fs'

import Link from 'next/link'

import SunburstSequences from './SunburstSequences'
import SourceCode from '../../components/SourceCode'

import json from '../../public/data/sequences-sunburst.json'

export default function Home(props) {
  return (
    <div>
      <h1>Sunburst Sequences For Next.js</h1>
      <ul>
        <li>
          This is a Next.js implementation of the awesome{' '}
          <a href="https://observablehq.com/@kerryrodden/sequences-sunburst">
            D3 Sequences Sunburst
          </a>{' '}
          by <a href="https://twitter.com/kerryrodden">Kerry Rodden</a>
        </li>
        <li>(Note that I haven&apos;t implement the breadcrumb yet)</li>
        <li>
          To use it, copy and paste the code below into a new file in your
          Next.js project called{' '}
          <SourceCode
            code={`components/SunburstSequences.js`}
            language="jsx"
            lines={false}
          />
        </li>
        <li>
          On the page you want to display the visualization, import the
          component with
          <SourceCode
            code={`import SunburstSequences from './components/SunburstSequences'`}
            language="jsx"
            lines={false}
          />
        </li>
        <li>
          I load the data into a JSON object that&apos;s an array of arrays.
          Each one containing two elements: the key and the value. Here&apos;s
          the{' '}
          <Link href="/data/sequences-sunburst.json">
            <a>sample dataset</a>
          </Link>{' '}
          for reference. I load it like this:
          <SourceCode
            code={`import json from '../../public/data/sunburst-sequences.json'`}
            language="jsx"
            lines={false}
          />
          This is the same format produced by <code>d3.csvParseRows()</code>.
          You can use it to parse a CSV file to create the <code>json</code>{' '}
          variable as well.
        </li>
        <li>
          The final step is to call the component with the data:
          <SourceCode
            code={`<SunburstSequences json={json} />`}
            language="jsx"
            lines={false}
          />
        </li>
      </ul>
      <h3>Here&apos;s what it looks like</h3>
      <SunburstSequences json={json} />
      <h3>And here&apos;s the code</h3>
      <SourceCode code={props.code} language="jsx" />
      <p>Enjoy</p>
    </div>
  )
}

export async function getStaticProps(context) {
  const fileToRead = `./pages/sunburst-sequences/SunburstSequences.js`
  try {
    const code = fs.readFileSync(fileToRead, `utf8`)
    return {
      props: {
        code: code,
      },
    }
  } catch (err) {
    return {
      props: {
        code: `Could not find: ${fileToRead} - ${err}`,
      },
    }
  }
}
