import React from 'react'
import styled from '@emotion/styled'
import useUpdatedLayoutEffect from './shared/use-updated-layout-effect'
import useUpdatedEffect from './shared/use-updated-effect'
import Logo from './shared/logo'
import Home from './pages/home'
import Food from './pages/food'
import Retail from './pages/retail'
import Community from './pages/community'
// @ts-ignore
import apercu from './shared/assets/fonts/apercu-mono.ttf'
// @ts-ignore
import ogg from './shared/assets/fonts/ogg.otf'
import posed, { PoseGroup } from 'react-pose'
import { Global, css } from '@emotion/core'
import { Link as RRLink, Route, Switch } from 'react-router-dom'

const url = '/canalstreet.market'
const TRANSITION_DURATION = 280
const ANIMATION_DELAY = 280
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

  const links = [
    { url: url, text: 'Home', chinese: `主页` },
    { url: `${url}/food`, text: 'Food', chinese: `餐饮` },
    { url: `${url}/retail`, text: 'Retail', chinese: `購物` },
    { url: `${url}/community`, text: 'Community', chinese: `文化` },
  ]

  // Updates the current state.openIndex state on each
  // route change. This will trigger an update to all
  // side effects that rely on state.openIndex
  useUpdatedEffect(() => {
    let index
    switch (props.match.params.section) {
      case 'food':
        index = 1
        break
      case 'retail':
        index = 2
        break
      case 'community':
        index = 3
        break
      default:
        index = 0
    }

    dispatch({
      type: 'SET_OPEN_INDEX',
      payload: { index },
    })

    // Scroll window to top since we're only changing
    // nodes nested within <Content />
    setTimeout(() => {
      window.scrollTo({ top: 0 })
    }, ANIMATION_DELAY)
  }, [props.match.params.section])

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

  // Updates the position of nav links.
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
            6}ms var(--ease)`
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

  // Animate content in after initial animation
  React.useEffect(() => {
    setTimeout(() => {
      if (content.current) {
        content.current.style.opacity = '1'
      }
    }, (TRANSITION_DURATION + 100) * links.length)
  }, [links.length])

  // Update document body color on each route change.
  React.useLayoutEffect(() => {
    document.body.style.backgroundColor = colors[state.openIndex]
  }, [state.openIndex])

  return (
    <>
      <Global styles={globalStyles} />
      <Header>
        <Nav>
          <Logo
            style={{
              position: 'absolute',
              top: '0',
              pointerEvents: 'none',
              touchAction: 'none',
              zIndex: 9,
              transform:
                props.match.url === url
                  ? `translate(60px, 60px) scale(1)`
                  : `translate(0px, 60px) scale(.8)`,
              transition: `transform ${TRANSITION_DURATION}ms var(--ease) ${ANIMATION_DELAY}ms`,
            }}
          />
          <Ul ref={listRef}>
            {links.map((l, index) => {
              const isOpen = l.url === props.match.url
              return (
                <li key={l.url}>
                  <Link
                    to={l.url}
                    style={{
                      opacity: isOpen ? 0 : 1,
                      transitionDelay: isOpen
                        ? `${TRANSITION_DURATION}ms`
                        : 'none',
                      pointerEvents: isOpen ? 'none' : 'initial',
                      touchAction: isOpen ? 'none' : 'initial',
                    }}
                    tabIndex={isOpen ? '-1' : '0'}
                    aria-current={isOpen ? 'page' : null}
                  >
                    <span className="zh-text">{l.chinese}</span>
                    <span className="en-text">{l.text}</span>
                  </Link>
                </li>
              )
            })}
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
              <Route path={`${url}`} exact component={Home} />
              <Route path={`${url}/food`} exact component={Food} />
              <Route path={`${url}/retail`} exact component={Retail} />
              <Route path={`${url}/community`} exact component={Community} />
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

  @font-face {
    font-family: 'Ogg';
    src: url(${ogg}) format('opentype');
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
    --font-ogg: 'Ogg', serif;

    --ease: cubic-bezier(0.8, 0, 0.2, 1);

    --font-size-xxs: 11px;
    --font-size-xs: 14px;
    --font-size-sm: 15px;
    --font-size-md: 20px;
    --font-size-lg: 60px;
    --font-size-ml: 32px;
    --font-size-xl: 75px;
    --font-size-xxl: 200px;

    --large-vertical-spacing: 120px;
  }

  * {
    font-family: var(--font-apercu);
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
    span {
      opacity: 0;
    }
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

const Link = styled(RRLink)<any>`
  display: flex;
  height: inherit;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: opacity ${TRANSITION_DURATION}ms var(--ease) ${ANIMATION_DELAY}ms;

  > span {
    font-family: var(--font-apercu);
    font-size: var(--font-size-md);
    color: var(--black);
  }

  > span.zh-text {
    position: absolute;
    top: 75px;
  }

  > span.en-text {
    writing-mode: vertical-lr;
  }
`

const Content = styled.div`
  position: relative;
  width: calc(100% - (4 * var(--nav-link-width)));
  padding: 120px 60px 60px 0px;
  opacity: 0;
  transition: opacity ${TRANSITION_DURATION * 2}ms var(--ease);
  z-index: 9;
`
