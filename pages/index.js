import Link from 'next/link'

export default function Page() {
  const links = [
    'using-d3-in-nextjs-basic-loading',
    'sunburst-sequences',
    'sunburst-basic',
  ]

  return (
    <div>
      <p>This is my scratchpad for making D3 examples that work with Next.js</p>
      <p>
        The main trick is to use method for basic loading described in the first
        link
      </p>
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
