import D3Example from '../../components/D3Example'
import SourceCode from '../../components/SourceCode'
import fs from 'fs'

export default function Page(props) {
  return (
    <div>
      <h1>How-to Use D3 in Next.js</h1>
      <p>
        I implemened a version of{' '}
        <a href="https://www.kerryrodden.com/">Kerry Rodden&apos;s</a> awesome{' '}
        <a href="https://observablehq.com/@kerryrodden/sequences-sunburst">
          Sequences Sunburst
        </a>{' '}
        in Next.js. It took a while to figure out how to use{' '}
        <a href="https://d3js.org/">D3</a> properly. In the interest of sharing,
        here&apos;s how to do it.
      </p>
      <h2>The Specifics</h2>
      <p>
        After creating your basic Next.js app, install D3 with:
        <SourceCode code={`npm install d3`} language="bash" lines={false} />
      </p>
      <p>
        Once you&apos;ve got it installed, create a file at{' '}
        <code>components/D3Example.js</code> and paste this example code into
        it:
        <SourceCode code={props.code1} language="jsx" />
      </p>
      <p>
        Then, create a file at <code>pages/d3-example.js</code> with :
        <SourceCode code={props.code2} language="jsx" />
      </p>

      <p>
        That's it. If you fire up your site and visit the page you&apos;ll see
        the D3 equivelent of Hello, World.
      </p>

      <D3Example width="200" height="200" />

      <h2 className="mt-6 pt-4 border-t border-gray-700">More Details</h2>

      <ul>
        <li>
          I load the entire set of D3 functionality via:
          <SourceCode
            code={`import * as d3 from 'd3'`}
            language="jsx"
            lines={false}
          />
          It&apos;s also possible to import just the parts you need with
          individual modules like
          <SourceCode
            code={`import { scaleLinear } from "d3-scale"`}
            language="jsx"
            lines={false}
          />
          Using the individual modules is probably the way to go for production
        </li>
        <li>
          All the <code>createRef</code> and <code>useEffect</code> stuff is
          designed to prevent the SVG from reloading if the comopnent updates.
        </li>
        <li>
          The <code>svg.selectAll('*').remove()</code> line prevents issues with
          re-appending elemnts to the SVG when the page hot-reloads during
          development
        </li>
        <li>
          This setup does the D3 rendering on the client side. It looks like{' '}
          <a href="https://github.com/d3-node/d3-node">d3-node</a> is the way to
          go for server-side, but I haven't messed with that yet
        </li>
        <li>
          Lots of the D3 examples I&apos;ve are for older versions that aren't
          compatible with the most recent one that comes from npm. It appears
          that as of Jan. 2022, the most recent npm install is either version 5
          or 6. If you have problems getting something to work, trying to figure
          out the example version number is a good first step.
        </li>
      </ul>
      <h2>Send Off</h2>
      <p>
        This is another case of there not being a lot of code, but it took some
        doing to find it and refine it. I hope you find it useful. If you see
        anything that could be improved{' '}
        <a href="https://twitter.com/TheIdOfAlan">let me know</a>.
      </p>
    </div>
  )
}

export async function getStaticProps(context) {
  const file1 = `./components/D3Example.js`
  const file2 = `./pages/d3-example.js`
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
        file1: `Error: - ${err}`,
        file2: `Error: - ${err}`,
      },
    }
  }
}
