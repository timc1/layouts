import React from 'react'
import styled from '@emotion/styled'

export default function Header({
  title,
  longTitle,
  zhText,
  imgSrc,
  imgAlt,
  moreInfo,
}: {
  title: string
  longTitle: string
  zhText: string
  imgSrc: string
  imgAlt: string
  moreInfo: string[]
}) {
  return (
    <Section>
      <Title>{title}</Title>
      <LongTitleWithPhoto>
        <LongTitle>{longTitle}</LongTitle>
        <LongTitlePhoto>
          <img src={imgSrc} alt={imgAlt} />
          <ZhText
            style={{
              left: imgSrc ? '' : '0',
            }}
          >
            {zhText}
          </ZhText>
          <MoreInfo>
            {moreInfo.map(info => (
              <p key={info}>{info}</p>
            ))}
          </MoreInfo>
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
  margin: var(--large-vertical-spacing) 0
    calc(var(--large-vertical-spacing) / 2) 0;
`

const LongTitlePhoto = styled.div`
  position: relative;
  padding-top: 120%;
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
    object-fit: cover;
  }
`

const ZhText = styled.span`
  position: absolute;
  top: -46px;
  right: -73px;
  font-size: var(--font-size-lg);
`

const MoreInfo = styled.div`
  position: absolute;
  top: calc(-1 * var(--large-vertical-spacing));
  right: -73px;
  > p {
    line-height: 21px;
    font-size: var(--font-size-xs);
    text-align: right;
    max-width: 280px;
  }
`
