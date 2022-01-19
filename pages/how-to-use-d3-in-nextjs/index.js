import D3Example from '../../components/D3Example'
import SourceCode from '../../components/SourceCode'
import fs from 'fs'
import Link from 'next/link'
import MetaData from '../../components/MetaData'

export default function Page(props) {
  return (
    <div>
      <MetaData
        description="A quick article showing how to implement D3 visualizations in Next.js"
        image="https://res.cloudinary.com/awsimages/image/upload/w_1200,h_630/c_fit,l_text:Arial_72_bold:How-to%20Use%20D3%20in%20Next.js,co_rgb:c4d4f4,w_1100/fl_layer_apply,g_north_west,x_60,y_220/og-images/d3-playground-main.png"
        title="How-To Use D3 In Next.js"
        type="article"
        url="https://d3-playground.alanwsmith.com/how-to-use-d3-in-nextjs"
      />
      <h1>How-to Use D3 in Next.js</h1>
      <p>
        I implemened a version of{' '}
        <a href="https://www.kerryrodden.com/">Kerry Rodden&apos;s</a> awesome{' '}
        <a href="https://observablehq.com/@kerryrodden/sequences-sunburst">
          Sequences Sunburst
        </a>{' '}
        in Next.js. You can see my version&apos;s code{' '}
        <Link href="/sunburst-sequences">
          <a>here</a>
        </Link>
        .
      </p>
      <p>
        The visualization is done with <a href="https://d3js.org/">D3</a>. It
        took some time to figure out how to get the library to work properly in
        Next.js. In the interest of sharing, here&apos;s how to do it.
      </p>

      <h2>The Specifics</h2>

      <ol>
        <li>
          After creating your basic Next.js app, install D3 with:
          <SourceCode code={`npm install d3`} language="bash" lines={false} />
        </li>
        <li>
          Next, create a file at <code>components/D3Example.js</code> and paste
          this into it:
          <SourceCode code={props.code1} language="jsx" />
        </li>
        <li>
          Then, create a file at <code>pages/d3-example.js</code> with :
          <SourceCode code={props.code2} language="jsx" />
        </li>

        <li>
          And, that&apos;s it. If you fire up your site and visit the{' '}
          <code>/d3-example</code> page you&apos;ll see a green circle like this
          one. The D3 equivelent of Hello, World.
          <D3Example width="200" height="200" />
        </li>
      </ol>

      <h2 className="mt-6 pt-4 ">More Details</h2>

      <ul>
        <li>
          This example loads the entire D3 library via:
          <SourceCode
            code={`import * as d3 from 'd3'`}
            language="jsx"
            lines={false}
          />
          It&apos;s possible to import only the parts you need with individual
          modules like:
          <SourceCode
            code={`import { scaleLinear } from "d3-scale"`}
            language="jsx"
            lines={false}
          />
          Using the individual modules is probably the way to go for production.
          I&apos;m not sure where the best place to get a list of the modules
          is, but you find them along with the rest of the D3 project{' '}
          <a href="https://github.com/d3">here</a>
        </li>
        <li>
          All the <code>createRef</code> and <code>useEffect</code> stuff is
          designed to prevent the SVG from reloading if the comopnent updates
        </li>
        <li>
          The <code>svg.selectAll(&apos;*&apos;).remove()</code> line prevents
          issues with re-appending elemnts to the SVG when the page hot-reloads
          during development. While it&apos;s not needed for prod it won&apos;t
          have any real effect so I leave it in
        </li>
        <li>
          This setup does the D3 rendering on the client side. It looks like{' '}
          <a href="https://github.com/d3-node/d3-node">d3-node</a> is the way to
          go for server-side, but I haven&apos;t messed with that yet
        </li>
        <li>
          Lots of the D3 examples I&apos;ve found are for older versions that
          aren&apos;t compatible with what gets installed from npm by default.
          If you have problems getting something to work, figuring out if
          there&apos;s a version conflict is a good first step
        </li>
      </ul>
      <h2>Send Off</h2>
      <p>
        This is another case of something that took a long time to find and
        refine that ended up being a relatively small amount of code. That
        happens. Hopefully this saves you that time and lets you get on to
        building your actual thing.{' '}
      </p>
      <p>Happy coding,</p>

      <p>
        - <a href="https://twitter.com/TheIdOfAlan">a</a>
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
