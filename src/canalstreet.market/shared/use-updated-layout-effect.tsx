import React from 'react'

export default function useUpdatedLayoutEffect(
  cb: any,
  deps: any[],
  premountcb?: boolean
) {
  const initialRender = React.useRef(false)

  React.useLayoutEffect(() => {
    if (!initialRender.current) {
      initialRender.current = true
      if (premountcb) cb(true)
      return
    }

    cb()
  }, [premountcb, cb, deps])
}
