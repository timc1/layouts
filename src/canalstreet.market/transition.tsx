import React from 'react'

export default function Transition({
  transitionKey,
  children,
}: {
  transitionKey: string
  children: React.ReactNode
}) {
  const cachedChildren = React.useRef<React.ReactNode>()

  React.useEffect(() => {
    cachedChildren.current = children
  }, [children])

  return (
    <>
      <div>{children}</div>
      <div>{cachedChildren.current && cachedChildren.current}</div>
    </>
  )
}
