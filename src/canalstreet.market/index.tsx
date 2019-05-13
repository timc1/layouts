import React from 'react'
import styled from '@emotion/styled'
// @ts-ignore
import apercu from './shared/apercu-mono.ttf'
import { Global, css } from '@emotion/core'
import { Link as RRLink } from 'react-router-dom'

const url = '/canalstreet.market'
const ANIMATION_DURATION = 800

export default function CanalStreetMarket(props: any) {
  const { section } = props.match.params

  const [openIndex, setOpenIndex] = React.useState(() => {
    switch (section) {
      case 'food':
        return 1
      case 'retail':
        return 2
      case 'community':
        return 3
      default:
        return 0
    }
  })

  const listRef = React.useRef<HTMLUListElement>(null)
  const content = React.useRef<HTMLDivElement>(null)

  const initialRender = React.useRef(false)
  // Updates the position of <Content />
  React.useLayoutEffect(() => {
    let translateAmt: number
    switch (openIndex) {
      case 1:
        translateAmt = 2
        break
      case 2:
        translateAmt = 3
        break
      case 3:
        translateAmt = 4
        break
      default:
        translateAmt = 1
    }

    setTimeout(
      () => {
        if (content.current)
          content.current.style.transform = `translateX(${translateAmt * 60}px)`
      },
      initialRender.current ? 1000 : 0
    )

    if (!initialRender.current) {
      initialRender.current = true
    }
  }, [openIndex])

  const previousOpenIndex = React.useRef<number>()
  const initRender = React.useRef(false)
  React.useEffect(() => {
    if (listRef.current) {
      const links = Array.from(listRef.current.querySelectorAll('li'))
      // Transition elements by x axis only after initial mount.
      if (initRender.current) {
        if (previousOpenIndex.current !== undefined) {
          if (openIndex > previousOpenIndex.current) {
            const elements = links.slice(0, openIndex + 1)
            elements.forEach((el, index) => {
              const position = el.getBoundingClientRect() as any
              el.style.transform = `translateX(${-1 *
                (position.x - index * 60)}px)`
              el.style.transitionDelay = `none`
              el.style.transition = `transform ${ANIMATION_DURATION}ms var(--ease)`

              setTimeout(() => {
                if (el) {
                  el.style.transform = `translateY(0)`
                  el.style.transitionDelay = ``
                  el.style.transition = ``
                  el.style.left = `${index * 60}px`
                  el.style.right = `unset`
                }
              }, ANIMATION_DURATION)
            })
          } else {
            // Don't move home link.
            const elements = links.slice(openIndex + 1)
            elements.forEach((el, index) => {
              const position = el.getBoundingClientRect() as any
              const innerWidth = window.innerWidth

              el.style.transform = `translateX(${innerWidth -
                (position.x + 60 * (elements.length - index))}px)`
              el.style.transitionDelay = `none`
              el.style.transition = `transform ${ANIMATION_DURATION}ms var(--ease)`

              setTimeout(() => {
                if (el) {
                  el.style.transform = `translateY(0)`
                  el.style.transitionDelay = ``
                  el.style.transition = ``
                  el.style.left = `unset`
                  el.style.right = `${60 * (elements.length - 1 - index)}px`
                }
              }, ANIMATION_DURATION)
            })
          }
        }
      } else {
        // Transition elements by y axis only if initial mount.
        initRender.current = true
        links.forEach((link, index) => {
          if (index <= openIndex) {
            link.style.left = `${index * 60}px`
            link.style.right = `unset`
          }
          link.style.transform = `translateY(0)`
          link.style.transformOrigin = `0 0`
          link.style.transition = `transform ${ANIMATION_DURATION *
            2}ms var(--ease)`
          link.style.transitionDelay = `${-150 * index}ms`
        })
      }
    }

    previousOpenIndex.current = openIndex
  }, [openIndex])

  const links = [
    { url: url, text: 'Home' },
    { url: `${url}/food`, text: 'Food' },
    { url: `${url}/retail`, text: 'Retail' },
    { url: `${url}/community`, text: 'Community' },
  ]

  return (
    <>
      <Global styles={globalStyles} />
      <Header>
        <Nav>
          <Ul ref={listRef}>
            {links.map((l, index) => (
              <li key={l.url} data-nav-item>
                <Link
                  to={l.url}
                  onClick={() => {
                    setOpenIndex(index)
                  }}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </Ul>
        </Nav>
      </Header>
      <Content ref={content}>Content</Content>
    </>
  )
}

const globalStyles = css`
  @font-face {
    font-family: 'Apercu';
    src: url(${apercu}) format('truetype');
    font-weight: 100 700;
  }

  :root {
    --nav-link-width: 60px;
    --black: #000;
    --white: #fff;
    --blue: #5ea3ec;
    --red: #f64444;
    --yellow: #ffb400;

    --font-apercu: 'Apercu', system-ui, sans-serif;

    --ease: cubic-bezier(0.8, 0, 0.2, 1);
  }
`

const Header = styled.header`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Nav = styled.nav`
  height: 100%;
`

const Ul = styled.ul`
  position: relative;
  list-style: none;
  height: inherit;

  > li {
    position: absolute;
    height: inherit;
    width: var(--nav-link-width);
    transform: translateY(-100%);
  }

  > li:first-of-type {
    right: calc(var(--nav-link-width) * 3);
    background: var(--white);
  }

  > li:nth-of-type(2) {
    right: calc(var(--nav-link-width) * 2);
    background: var(--blue);
  }

  > li:nth-of-type(3) {
    right: var(--nav-link-width);
    background: var(--red);
  }

  > li:nth-of-type(4) {
    right: 0;
    background: var(--yellow);
  }
`

const Link = styled(RRLink)`
  display: flex;
  height: inherit;
  width: 100%;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-lr;
  font-family: var(--font-apercu);
  color: var(--black);
  text-decoration: none;
`

const Content = styled.div`
  position: relative;
  width: calc(100% - (4 * var(--nav-link-width)));
  z-index: 9;
`
