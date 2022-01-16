import Link from 'next/link'

export default function Page() {
  const links = [
    'using-d3-in-nextjs-basic-loading',
    'sequences-sunburst',
    'sunburst-basic',
  ]

  return (
    <ul>
      {links.map((link) => (
        <li key={link}>
          <Link href={link}>
            <a>{link}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
