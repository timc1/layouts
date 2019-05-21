import React from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { keyframes } from '@emotion/core'
import { Link } from 'react-router-dom'

const TRANSITION_DELAY = 250

const links = [
  { id: 0, subheader: 'Post', header: 'Recreating Unique Site Layouts' },
  {
    id: 1,
    subheader: 'Case Study',
    header: 'Importance Of Well Designed Internal Tools',
  },
  { id: 2, subheader: 'Post', header: 'Build An Editable List Using React' },
  { id: 3, subheader: 'Post', header: 'Controlling Scroll, But Not Too Much!' },
]

export default function AnimatedNav() {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <ThemeProvider theme={{ isOpen }}>
      <Header>
        <Nav>
          <Toggle onClick={() => setOpen(() => !isOpen)}>
            <ToggleText>
              <span>Menu</span>
              <span>Close</span>
            </ToggleText>
            <button>{isOpen ? 'Close' : 'Menu'}</button>
          </Toggle>
          <Ul>
            {links.map(l => (
              <li key={l.id}>
                <NavItem to="/animated-nav/">
                  <span>{l.subheader}</span>
                  <p>{l.header}</p>
                </NavItem>
              </li>
            ))}
          </Ul>
        </Nav>
      </Header>
    </ThemeProvider>
  )
}

const Header = styled.header`
  --max-width: 400px;
  --scale-amount: 0.35;
  --dot-width: 18px;
  --box-shadow: 0 1px 3px rgba(188, 193, 217, 0.22),
    0 5px 12px rgba(188, 193, 217, 0.35);
  --box-shadow-2: 0 6px 8px rgba(188, 193, 217, 0.22),
    0 13px 10px rgba(188, 193, 217, 0.25);
  --box-shadow-3: 0 1px 10px rgba(0, 0, 0, 0.25);
  --border-radius: 5px;
`

const Nav = styled.nav`
  position: absolute;
  height: 50px;
  top: 10px;
  left: 0;
  right: 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Ul = styled.ul`
  list-style: none;
  position: absolute;
  right: 20px;
  top: 40px;
  width: var(--max-width);
  pointer-events: ${props => (props.theme.isOpen ? 'initial' : 'none')};
  touch-action: ${props => (props.theme.isOpen ? 'initial' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: var(--box-shadow-2);
    background: #fff;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    transform-origin: 0 0;
    transform: ${props => (props.theme.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
    transition: transform ${TRANSITION_DELAY}ms ease;
    transition-delay: ${props =>
      props.theme.isOpen ? `${TRANSITION_DELAY * 2}ms` : '0'};
  }

  li {
    position: relative;
    opacity: ${props => (props.theme.isOpen ? '1' : '0')};
    transition: opacity
      ${props => (props.theme.isOpen ? `${TRANSITION_DELAY}ms` : '0')} ease
      ${props => (props.theme.isOpen ? `${TRANSITION_DELAY * 3}ms` : '0ms')};
    z-index: 1;
  }
`

const NavItem = styled(Link)`
  display: block;
  padding: 5% 10% 5% 5%;
  text-decoration: none;

  span {
    display: block;
    font-size: 12px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 5px;
  }

  p {
    color: #000;
  }
`

const blink = keyframes`
  0%, 50%, 100% {
    opacity: 0; 
  }

  25%, 75% {
    opacity: 1 
  }
`

const Toggle = styled.h2`
  position: relative;
  height: 40px;
  width: var(--max-width);

  > button {
    position: relative;
    height: inherit;
    width: inherit;
    font-size: 0;
    background: transparent;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transform: ${props =>
      props.theme.isOpen ? 'scaleX(1)' : 'scaleX(var(--scale-amount))'};
    transform-origin: 100%;
    transition: transform ${TRANSITION_DELAY}ms ease;
    transition-delay: ${props =>
      props.theme.isOpen ? '0' : `${TRANSITION_DELAY}ms`};
    outline: none;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: inherit;
      width: inherit;
      border-radius: inherit;
      box-shadow: var(--box-shadow);
    }
  }

  > span.open {
    &::before {
      animation: ${blink} ${TRANSITION_DELAY}ms 1 linear;
      animation-delay: ${TRANSITION_DELAY}ms;
      animation-fill-mode: forwards;
    }
  }
`

const ToggleText = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`
