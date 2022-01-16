import D3Svg from './D3Svg'
import SourceCode from '../../components/SourceCode'
import fs from 'fs'

export default function Page(props) {
  return (
    <div>
      <h1>Using D3 in Next.js - Basic Loading</h1>
      <ul>
        <li>
          The code below shows the basic setup for how to use D3 in a Next.js
          app
        </li>
        <li>
          D3 is installed with <code className="language-bash">npm i d3</code>
        </li>
        <li>
          I&apos;m using{' '}
          <code className="language-jsx">import * as d3 from 'd3'</code> to load
          everything. It&apos;s also possible to import just the parts you need
          with individual modules like{' '}
          <code className="language-jsx">
            import {'{'} scaleLinear {'}'} from "d3-scale"
          </code>
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
      <SourceCode code={props.fileContents} />
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
