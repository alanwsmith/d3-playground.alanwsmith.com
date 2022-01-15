import Link from 'next/link'

export default function Page() {
  const links = ['sunburst-basic', 'sunburst-sequences']

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
