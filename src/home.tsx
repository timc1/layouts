import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Container>
      <h1>Layout Experiments</h1>
      <p>Recreating really awesome, unique user interfaces</p>
      <p>
        <a
          href="https://twitter.com/timcchang"
          target="_blank"
          rel="noopener noreferrer"
        >
          @timcchang
        </a>
      </p>

      <ul>
        <li>
          <p>Canal Street Market</p>
          <Link
            to="/canalstreet.market/"
            target="_blank"
            rel="noopener noreferrer"
          >
            canalstreet.market
          </Link>
        </li>
        <li>
          <p>Double Animated Navigation</p>
          <Link to="/animated-nav/" target="_blank" rel="noopener noreferrer">
            animated-nav
          </Link>
        </li>
      </ul>
    </Container>
  )
}

const Container = styled.div`
  padding: 100px;

  > h1 {
    margin-bottom: 20px;
    font-size: 30px;
  }

  > p {
    margin-bottom: 20px;
  }

  > ul {
    list-style: none;
    margin-top: 100px;
  }

  li {
    margin-bottom: 40px;
  }

  li > p {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 12px;
  }

  a {
    color: blue;
    text-decoration: none;
  }
`
