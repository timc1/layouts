import React from 'react'
import styled from '@emotion/styled'

export function Header({
  title,
  longTitle,
  zhText,
  imgSrc,
  imgAlt,
}: {
  title: string
  longTitle: string
  zhText: string
  imgSrc: string
  imgAlt: string
}) {
  return (
    <Section>
      <Title>{title}</Title>
      <LongTitleWithPhoto>
        <LongTitle>{longTitle}</LongTitle>
        <LongTitlePhoto>
          <img src={imgSrc} alt={imgAlt} />
          <ZhText>{zhText}</ZhText>
        </LongTitlePhoto>
      </LongTitleWithPhoto>
    </Section>
  )
}

const Section = styled.section`
  position: relative;
`

const Title = styled.h1`
  position: relative;
  writing-mode: vertical-lr;
  opacity: 0.35;
  font-size: var(--font-size-sm);

  &::after {
    content: '\\21E3';
    position: absolute;
    left: 0;
    bottom: -30px;
    transform: rotate(-90deg) scale(1.5);
  }
`

const LongTitle = styled.h2`
  font-family: var(--font-ogg);
  font-size: var(--font-size-xxl);
  line-height: 0.95;
`

const LongTitleWithPhoto = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  margin: var(--large-vertical-spacing) 0;
`

const LongTitlePhoto = styled.div`
  position: relative;
  padding-top: 130%;
  height: max-content;
  transform: translate(
    calc(var(--large-vertical-spacing) / 2 * -1),
    calc(var(--large-vertical-spacing) / 4 * -1)
  );

  > img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #eee;
    object-fit: cover;
  }
`

const ZhText = styled.span`
  position: absolute;
  top: -46px;
  right: -73px;
  font-size: var(--font-size-lg);
`
