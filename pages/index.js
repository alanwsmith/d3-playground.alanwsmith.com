import Link from 'next/link'

export default function Page() {
  const links = ['sunburst-sequences', 'sunburst-basic']

  return (
    <div>
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
