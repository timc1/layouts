import React from 'react'
import styled from '@emotion/styled'
// @ts-ignore
import apercu from './shared/apercu-mono.ttf'
import { Global, css } from '@emotion/core'
import { Link as RRLink } from 'react-router-dom'

export default function CanalStreetMarket(props: any) {
  const { section } = props.match.params

  const initialRender = React.useRef(false)
  const content = React.useRef<HTMLDivElement>(null)
  React.useLayoutEffect(() => {
    console.log('update')
    // Shift content.
    let translateAmt: number
    switch (section) {
      case 'food':
        translateAmt = 1
        break
      case 'retail':
        translateAmt = 2
        break
      case 'community':
        translateAmt = 3
        break
      default:
        translateAmt = 0
    }

    setTimeout(
      () => {
        if (content.current)
          content.current.style.transform = `translateX(${translateAmt * 60}px)`
      },
      initialRender.current ? 400 : 0
    )

    if (!initialRender.current) {
      initialRender.current = true
    }
  }, [section])

  const url = '/canalstreet.market'
  return (
    <>
      <Global styles={globalStyles} />
      <Header>
        <Nav>
          <Ul>
            <li>
              <Link to={url}>Home</Link>
            </li>
            <li>
              <Link to={`${url}/food`}>Food</Link>
            </li>
            <li>
              <Link to={`${url}/retail`}>Retail</Link>
            </li>
            <li>
              <Link to={`${url}/community`}>Community</Link>
            </li>
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
  }

  > li:first-of-type {
    left: 0;
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
