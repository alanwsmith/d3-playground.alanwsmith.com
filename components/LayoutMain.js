import Link from 'next/link'

export default function LayoutMain({ children }) {
  return (
    <>
      <nav className="mt-4 mx-auto pt-2 px-6 max-w-prose">
        <div className="border-b border-gray-700">
          <Link href="/">
            <a className="text-gray-500">D3 Scratchpad</a>
          </Link>{' '}
          -{' '}
          <a className="text-gray-500" href="https://www.alanwsmith.com/">
            Main Website
          </a>{' '}
          -{' '}
          <a className="text-gray-500" href="https://twitter.com/TheIdOfAlan">
            Twitter
          </a>{' '}
        </div>
      </nav>
      <main className="pb-10 mx-auto container pt-3 px-6 max-w-prose">
        {children}
      </main>
      <footer className="max-w-prose mx-auto px-6">
        <div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
          made by{' '}
          <a className="text-blue-400" href="https://twitter.com/TheIdOfAlan">
            alan w. smith
          </a>
        </div>
        <div className="text-center text-sm pb-8 text-gray-500 ">
          who also has a{' '}
          <a className="text-blue-400" href="https://www.alanwsmith.com/">
            full website
          </a>{' '}
          and a{' '}
          <a className="text-blue-400" href="https://podcast.alanwsmith.com/">
            podcast
          </a>
        </div>
      </footer>
    </>
  )
}
