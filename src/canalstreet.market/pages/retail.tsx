import React from 'react'
import Header from './shared/header'
import ListItem, { ListContainer } from './shared/list-item'
import retail from '../shared/assets/images/retail.jpg'

export default function Retail() {
  return (
    <>
      <Header
        title="Retail"
        longTitle="The Retail Market"
        imgSrc={retail}
        imgAlt="Food Hall"
        zhText="購物"
        moreInfo={[
          'Retail Market Hours:',
          'Mon - Sat: 11AM-7PM',
          'Sun: 11AM-6PM',
        ]}
      />
      <ListContainer>
        {items.map(i => (
          <ListItem key={i.title} title={i.title} subtitle={i.subtitle} />
        ))}
      </ListContainer>
    </>
  )
}

const items = [
  { title: `American Design Club`, subtitle: `Design Objects` },
  { title: `Baobab Clothing Company`, subtitle: `The Polo Short Perfected` },
  { title: `Beeshaus & Raum NYC`, subtitle: `Jewelry` },
  { title: `Beroep Tech`, subtitle: `Jewelry` },
  { title: `By Robert James`, subtitle: `Menswear` },
  { title: `Dandy Farmer Bonsai Shop`, subtitle: `Bonsai Shop` },
  { title: `Fox Fodder Farm`, subtitle: `Florist` },
  { title: `Green Witch`, subtitle: `Beauty & Wellness` },
  { title: `I Haven't The Foggiest`, subtitle: `Premium Childrenswear` },
  { title: `Kynsho`, subtitle: `Accessories` },
  { title: `Leibal`, subtitle: `Design Objects` },
  { title: `Mandu Apparel`, subtitle: `K Pop Apparel and Merchandise` },
  { title: `Office Magazine Newstand`, subtitle: `Newstand and Magazines` },
  { title: `Orez Lifestyle`, subtitle: `Sustainable Lifestyle Store` },
  { title: `Rora`, subtitle: `Apparel` },
  { title: `Seven 50`, subtitle: `Jewelry` },
  { title: `Siizu`, subtitle: `Sustainable lifestyle store` },
  { title: `Sweet Nova`, subtitle: `Superfood` },
]
