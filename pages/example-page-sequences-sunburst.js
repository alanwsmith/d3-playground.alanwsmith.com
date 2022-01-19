import SunburstSequences from '../components/SequencesSunburst'

import json from '../public/data/sequences-sunburst.json'

export default function Page() {
  return (
    <div>
      <SunburstSequences json={json} />
    </div>
  )
}
