import React from 'react'
import styled from '@emotion/styled'
import IntersectionImage from '../shared/intersection-image'

import canalhome from '../shared/assets/images/canal_home.jpg'

export default function Home() {
  return (
    <>
      <Title>
        Canal Street Market is a carefully curated retail market, food hall &
        community space open year-round at 265 Canal Street.
      </Title>
      <IntersectionImage
        src={canalhome}
        alt="Canal Street Market Lobby"
        style={{
          margin: 'var(--large-vertical-spacing) -60px',
        }}
      />
    </>
  )
}

const Title = styled.h1`
  padding-top: 70px;
  font-family: var(--font-ogg);
  font-size: var(--font-size-xl);
  max-width: 1030px;
  line-height: 86px;
`
