import React from 'react'
import { Tldraw } from 'tldraw'
import { useSyncDemo } from '@tldraw/sync'
import 'tldraw/tldraw.css'

const RealtimeCompp = () => {
    const store = useSyncDemo({ roomId: 'realtimecompp' })

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw store={store} />
		</div>
    
  )
}

export default RealtimeCompp