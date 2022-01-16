import D3Svg from './D3Svg'
import SourceCode from '../../components/SourceCode'
import fs from 'fs'

export default function Page(props) {
  return (
    <div>
      <h1>Using D3 in Next.js</h1>
      <ul>
        <li>
          This is how to use the <a href="https://d3js.org/">D3</a> javascript
          library in <a href="https://nextjs.org/">Next.js</a>. The rending is
          done client-side instead of server-side. (It looks like{' '}
          <a href="https://github.com/d3-node/d3-node">d3-node</a> is the way to
          go for server-side, but I haven't messed with that yet.)
        </li>
        <li>
          First, install D3 with:
          <SourceCode code={`npm install d3`} language="bash" lines={false} />
        </li>
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
            code={`import {'{'} scaleLinear {'}'} from "d3-scale"`}
            language="jsx"
            lines={false}
          />
        </li>
      </ul>
      <p>
        Here's the ouput from a call to the below code with{' '}
        {'<D3Svg width="400" height="50" />'}
      </p>

      <div className="pt-10">
        <D3Svg width="400" height="150" />
      </div>
      <p>And this is the source code it self</p>
      <SourceCode code={props.fileContents} language="jsx" />
      <p>
        One thing to point out is that lots of the D3 examples are for older
        versions that aren't compatible with the most recent one from npm. It
        appears that as of Jan. 2022, the most recent npm install is either
        version 5 or 6. If you have problems getting something to work, trying
        to figure out the example version number is a good first step.
      </p>
    </div>
  )
}

export async function getStaticProps(context) {
  const fileToRead = `./pages/using-d3-in-nextjs-basic-loading/D3Svg.js`
  try {
    const fileContents = fs.readFileSync(fileToRead, `utf8`)
    return {
      props: {
        fileContents: fileContents,
      },
    }
  } catch (err) {
    return {
      props: {
        fileContents: `Could not find: ${fileToRead} - ${err}`,
      },
    }
  }
}
