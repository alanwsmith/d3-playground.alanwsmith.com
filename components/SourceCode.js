import { useEffect } from 'react'
import Prism from 'prismjs'

import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default function SourceCode({ code, language, lines = true }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="text-sm">
      <pre
        className={`border border-gray-600 ${
          lines === true ? 'line-numbers' : ''
        }`}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
