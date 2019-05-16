import React from 'react'
import Header from './shared/header'
import styled from '@emotion/styled'

const events = [
  {
    date: '04/26 (past)',
    description: 'Food Hall Family Discount - 10% OFF any ONE food item',
  },
  {
    date: '04/18 (past)',
    description: 'Asian Creative Collective - Illustration / Tattoo',
  },
  { date: '03/20 (past)', description: 'Hack City Comedy Show' },
  { date: '02/27 (past)', description: 'Hack City Comedy Show 2/27' },
]

export default function Retail() {
  return (
    <>
      <Header
        title="Community"
        longTitle="Canal St. Community"
        imgSrc=""
        imgAlt=""
        zhText="文化"
        moreInfo={[
          'Our mixed-use space hosts, ongoing events, podcasts & artists in residence',
        ]}
      />
      <EventsContainer>
        <h2>
          <span>Market</span> <span>Events</span>
        </h2>
        <EventsGrid>
          {events.map(e => (
            <Event key={e.description}>
              <span>{e.date}</span>
              <p>{e.description}</p>
            </Event>
          ))}
          <li />
          <li />
          <li />
          <li />
        </EventsGrid>
      </EventsContainer>
    </>
  )
}

const EventsContainer = styled.section`
  position: relative;

  > h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    > span {
      display: block;
      font-size: calc(var(--font-size-xxl) / 2);
      line-height: calc(var(--font-size-xxl) / 2);
      font-family: var(--font-ogg);
    }
  }
`

const EventsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense;
  grid-gap: 0 calc(var(--large-vertical-spacing) / 2);
  list-style: none;

  > li:first-of-type {
    grid-column: 1;
  }
  > li:nth-of-type(2) {
    grid-column: 4;
  }
  > li:nth-of-type(3) {
    grid-column: 1;
    grid-row: 2;
  }
  > li:nth-of-type(4) {
    grid-column: 4;
    grid-row: 2;
  }

  > li:first-of-type,
  > li:nth-of-type(2),
  > li:nth-of-type(5),
  > li:nth-of-type(6) {
    background-image: repeating-linear-gradient(
      -74deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5) 1px,
      transparent 0,
      transparent 8px
    );
    background-position: 0 0;
    background-repeat: repeat-x;
    background-size: 100% 22px;
  }

  > li:nth-of-type(3),
  > li:nth-of-type(4) {
    background-image: repeating-linear-gradient(
        -74deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5) 1px,
        transparent 0,
        transparent 8px
      ),
      repeating-linear-gradient(
        -74deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5) 1px,
        transparent 0,
        transparent 8px
      );
    background-position: 0 0, 0 100%;
    background-repeat: repeat-x;
    background-size: 100% 22px, 100% 22px;
    padding: calc(var(--large-vertical-spacing) / 2 + 22px)
      calc(var(--large-vertical-spacing) / 2);
  }

  > li:nth-of-type(7),
  > li:nth-of-type(8) {
    background-image: repeating-linear-gradient(
      -74deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5) 1px,
      transparent 0,
      transparent 8px
    );
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 100% 22px;
  }
`

const Event = styled.li`
  padding: calc(var(--large-vertical-spacing) / 2);
  text-align: center;

  > span {
    display: block;
    margin-bottom: 15px;
    font-size: var(--font-size-xxs);
  }
`
