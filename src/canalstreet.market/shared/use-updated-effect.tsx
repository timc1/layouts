import React from 'react'

export default function useUpdatedEffect(
  callback: () => any,
  deps: any[] = []
) {
  const hasInitiallyRendered = React.useRef(false)
  React.useEffect(() => {
    if (!hasInitiallyRendered.current) {
      hasInitiallyRendered.current = true
      return
    }

    return callback()
    // eslint-disable-next-line
  }, deps)
}
