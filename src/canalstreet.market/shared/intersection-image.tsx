import React from 'react'
import styled from '@emotion/styled'

export default function IntersectionImage({
  src,
  alt,
  ...rest
}: {
  src: string
  alt: string
  [k: string]: any
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  // Setup IntersectionObserver
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as any
            target.style.opacity = `1`
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '-30%',
      }
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <Container ref={containerRef} {...rest}>
      <img src={src} alt={alt} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding-top: 69%;
  opacity: 0;
  transition: opacity 250ms var(--ease);

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
