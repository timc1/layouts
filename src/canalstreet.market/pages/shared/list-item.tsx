import React from 'react'
import styled from '@emotion/styled'

export function ListContainer({
  children,
  ...rest
}: {
  children: React.ReactNode
  [k: string]: any
}) {
  return <Ul {...rest}>{children}</Ul>
}

export default function ListItem({
  subtitle,
  title,
}: {
  subtitle: string
  title: string
}) {
  return (
    <Item>
      <span>{subtitle}</span>
      <h3>{title}</h3>
    </Item>
  )
}

const Item = styled.li`
  display: flex;
  flex-direction: column;

  > span {
    margin-bottom: 30px;
  }

  > h3 {
    font-size: var(--font-size-ml);
    font-family: var(--font-ogg);
  }
`

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 80px 60px;
  list-style: none;
  padding: 0;
`
