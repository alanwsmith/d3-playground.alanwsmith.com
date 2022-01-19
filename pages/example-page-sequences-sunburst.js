import SunburstSequences from '../components/SunburstSequences'

import json from '../public/data/sunburst-sequences.json'

export default function Page() {
  return (
    <div>
      <SunburstSequences json={json} />
    </div>
  )
}
