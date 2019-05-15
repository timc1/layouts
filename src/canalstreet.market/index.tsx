import React from 'react'
import styled from '@emotion/styled'
import useUpdatedLayoutEffect from './shared/use-updated-layout-effect'
// @ts-ignore
import apercu from './shared/apercu-mono.ttf'
import posed, { PoseGroup } from 'react-pose'
import { Global, css } from '@emotion/core'
import { Link as RRLink, Route, Switch } from 'react-router-dom'

const url = '/canalstreet.market'
const TRANSITION_DURATION = 250
const ANIMATION_DELAY = 250
const colors = [`var(--white)`, `var(--blue)`, `var(--red)`, `var(--yellow)`]

type StateType = {
  openIndex: number
  isTransitioning: boolean
}

type ActionType = {
  type: string
  payload?: {
    [k: string]: any
  }
}

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_OPEN_INDEX':
      return {
        ...state,
        isTransitioning: true,
        openIndex: action.payload && action.payload.index,
      }
    case 'STOP_TRANSITION':
      return {
        ...state,
        isTransitioning: false,
      }
    default:
      throw new Error(`No type of ${action.type} found.`)
  }
}

export default function CanalStreetMarket(props: any) {
  const { section } = props.match.params

  const [state, dispatch] = React.useReducer(reducer, {
    openIndex: (() => {
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
    })(),
    isTransitioning: false,
  })

  const listRef = React.useRef<HTMLUListElement>(null)
  const content = React.useRef<HTMLDivElement>(null)
  const transitionCoverRef = React.useRef<HTMLDivElement>(null)

  // Updates the position of <Content />
  useUpdatedLayoutEffect(
    (premount: boolean) => {
      let translateAmt: number
      switch (state.openIndex) {
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
            content.current.style.transform = `translateX(${translateAmt *
              60}px)`
        },
        premount ? 0 : TRANSITION_DURATION
      )
    },
    [state.openIndex],
    true
  )

  const previousOpenIndex = React.useRef<number>()
  const initRender = React.useRef(false)
  React.useEffect(() => {
    if (listRef.current) {
      const links = Array.from(listRef.current.querySelectorAll('li'))

      // Transition elements by x axis only after initial mount.
      if (initRender.current) {
        if (previousOpenIndex.current !== undefined) {
          if (state.openIndex > previousOpenIndex.current) {
            const elements = links.slice(0, state.openIndex + 1)

            // Fade content out
            if (content.current) {
              content.current.style.opacity = '0'
              content.current.style.transition = `opacity ${ANIMATION_DELAY}ms var(--ease)`
            }

            elements.forEach((el, index) => {
              const position = el.getBoundingClientRect() as any
              el.style.transform = `translateX(${-1 *
                (position.x - index * 60)}px)`
              el.style.transition = `transform ${TRANSITION_DURATION}ms var(--ease)`
              el.style.transitionDelay = `${ANIMATION_DELAY}ms`

              setTimeout(() => {
                if (el) {
                  el.style.transform = `translateY(0)`
                  el.style.transitionDelay = ``
                  el.style.transition = ``
                  el.style.left = `${index * 60}px`
                  el.style.right = `unset`

                  // Fade content back in.
                  if (content.current) {
                    content.current.style.opacity = '1'
                    content.current.style.transition = `opacity ${ANIMATION_DELAY}ms var(--ease)`
                    content.current.style.transitionDelay = `${ANIMATION_DELAY}ms`
                  }
                }
              }, TRANSITION_DURATION + ANIMATION_DELAY)
            })
          } else {
            // Don't move home link.
            const elements = links.slice(state.openIndex + 1)

            // Fade content out
            if (content.current) {
              content.current.style.opacity = '0'
              content.current.style.transition = `opacity ${ANIMATION_DELAY}ms var(--ease)`
            }

            elements.forEach((el, index) => {
              const position = el.getBoundingClientRect() as any
              const innerWidth = window.innerWidth

              el.style.transform = `translateX(${innerWidth -
                (position.x + 60 * (elements.length - index))}px)`
              el.style.transition = `transform ${TRANSITION_DURATION}ms var(--ease)`
              el.style.transitionDelay = `${ANIMATION_DELAY}ms`

              setTimeout(() => {
                if (el) {
                  el.style.transform = `translateY(0)`
                  el.style.transitionDelay = ``
                  el.style.transition = ``
                  el.style.left = `unset`
                  el.style.right = `${60 * (elements.length - 1 - index)}px`
                }

                // Fade content back in.
                if (content.current) {
                  content.current.style.opacity = '1'
                  content.current.style.transition = `opacity ${ANIMATION_DELAY}ms var(--ease)`
                  content.current.style.transitionDelay = `${ANIMATION_DELAY}ms`
                }
              }, TRANSITION_DURATION + ANIMATION_DELAY)
            })
          }
        }
      } else {
        // Transition elements by y axis only if initial mount.
        initRender.current = true
        links.forEach((link, index) => {
          if (index <= state.openIndex) {
            link.style.left = `${index * 60}px`
            link.style.right = `unset`
          }
          link.style.transform = `translateY(0)`
          link.style.transformOrigin = `0 0`
          link.style.transition = `transform ${TRANSITION_DURATION *
            7}ms var(--ease)`
          link.style.transitionDelay = `${-100 * index}ms`
        })
      }
    }

    previousOpenIndex.current = state.openIndex
  }, [state.openIndex])

  // Transitions for background transition layer.
  useUpdatedLayoutEffect(
    (premount: boolean) => {
      if (transitionCoverRef.current) {
        const backgrounds = Array.from(
          transitionCoverRef.current.querySelectorAll('span')
        )

        if (premount) {
          backgrounds.forEach((bg, index) => {
            if (index > state.openIndex) {
              bg.style.transform = `translateX(calc(100% - calc(var(--nav-link-width) * 2)))`
              bg.style.opacity = `0`
            } else if (index !== state.openIndex) {
              bg.style.opacity = `0`
            }
          })
          return
        }

        backgrounds.forEach((bg, index) => {
          if (index <= state.openIndex) {
            // Open
            bg.style.transform = `translateX(0px)`
            bg.style.opacity = `1`
            bg.style.transition = `transform ${TRANSITION_DURATION}ms var(--ease) ${ANIMATION_DELAY}ms`
          } else {
            bg.style.transform = `translateX(calc(100% - calc(var(--nav-link-width) * 2)))`
            bg.style.transition = `transform ${TRANSITION_DURATION}ms var(--ease) ${ANIMATION_DELAY}ms`
          }
        })
      }
    },
    [state.openIndex],
    true // Premount - pls make this more clear lol 🙃
  )

  console.log('state', state)

  // Update document body color on each route change.
  React.useLayoutEffect(() => {
    document.body.style.backgroundColor = colors[state.openIndex]
  }, [state.openIndex])

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
              <li key={l.url}>
                <Link
                  to={l.url}
                  onClick={() => {
                    dispatch({
                      type: 'SET_OPEN_INDEX',
                      payload: { index },
                    })
                  }}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </Ul>
        </Nav>
        <TransitionCover ref={transitionCoverRef}>
          <span />
          <span />
          <span />
          <span />
        </TransitionCover>
      </Header>
      <Content ref={content}>
        <PoseGroup>
          <RoutesContainer key={props.match.url}>
            <Switch location={props.location}>
              <Route path={`${url}`} exact component={() => <div>Home</div>} />
              <Route
                path={`${url}/food`}
                exact
                component={() => <div>Food</div>}
              />
              <Route
                path={`${url}/retail`}
                exact
                component={() => <div>Retail</div>}
              />
              <Route
                path={`${url}/community`}
                exact
                component={() => <div>Community</div>}
              />
            </Switch>
          </RoutesContainer>
        </PoseGroup>
      </Content>
    </>
  )
}

const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: ANIMATION_DELAY },
  exit: { opacity: 0, delay: ANIMATION_DELAY },
})

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

const TransitionCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  touch-action: none;
  z-index: -1;

  > span {
    position: absolute;
    top: 0;
    width: calc(100% - var(--nav-link-width) * 2);
    height: 100%;
  }

  > span:first-of-type {
    left: 0;
    background: var(--white);
  }

  > span:nth-of-type(2) {
    left: var(--nav-link-width);
    background: var(--blue);
  }

  > span:nth-of-type(3) {
    left: calc(var(--nav-link-width) * 2);
    background: var(--red);
  }

  > span:nth-of-type(4) {
    left: calc(var(--nav-link-width) * 3);
    background: var(--yellow);
  }
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
