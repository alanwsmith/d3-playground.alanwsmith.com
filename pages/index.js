import Link from 'next/link'
import MetaData from '../components/MetaData'

export default function Page() {
  const links = ['sequences-sunburst', 'sunburst-basic']

  return (
    <div>
      <MetaData
        description="The D3 Playground Of Alan W. Smith"
        image="https://res.cloudinary.com/awsimages/image/upload/w_1200,h_630/c_fit,l_text:Arial_72_bold:A%20Place%20For%20Me%20To%20Play%20With%20D3,co_rgb:c4d4f4,w_1100/fl_layer_apply,g_north_west,x_60,y_220/og-images/d3-playground-main.png"
        title="D3 Playground"
        type="website"
        url="https://d3-playground.alanwsmith.com/"
      />

      <h1>D3 Playground</h1>
      <p>
        This is my scratchpad for making <a href="https://d3js.org/">D3</a>{' '}
        examples that work with <a href="https://nextjs.org/">Next.js</a>
      </p>
      <p>
        The main trick is to load things as described here in{' '}
        <Link href="how-to-use-d3-in-nextjs">
          <a>How-To Use D3 In Next.js</a>
        </Link>
      </p>
      <p>
        There&apos;s obviously not much here right now. I mainly built it to
        figure out the Next.js Sunburst Sequence. I&apos;ll add to it over time
        when I come up with new things to mess with.
      </p>

      <h2>The Examples</h2>

      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link href={link}>
              <a>{link}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
