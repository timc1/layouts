import React from 'react'
import Header from './shared/header'
import ListItem, { ListContainer } from './shared/list-item'
import foodhall from '../shared/assets/images/foodhall.jpg'

export default function Food() {
  return (
    <>
      <Header
        title="Food"
        longTitle="The Food Hall"
        imgSrc={foodhall}
        imgAlt="Food Hall"
        zhText="餐饮"
        moreInfo={['Food Hall Hours', 'Mon - Sat: 11AM-7PM', 'Sun: 11AM-6PM']}
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
  { title: `Azumma`, subtitle: `Korean Meets Mexican` },
  { title: `Boba Guys`, subtitle: `Next Level Boba Milk Tea` },
  { title: `Bonsai Kakigōri`, subtitle: `Japanese-Inspired Desserts` },
  { title: `Izakaya Samurice`, subtitle: `Japanese Kitchen` },
  { title: `Joe's Steam Rice Roll`, subtitle: `Cantonese Steamed Rice Rolls` },
  { title: `Kuro-Obi`, subtitle: `Ramen by Ippudo` },
  { title: `Mission Ceviche`, subtitle: `New Peruvian Cuisine` },
  { title: `Office Coffee`, subtitle: `Coffee, Pastries & Smoothies` },
  { title: `fresh&co`, subtitle: `Chef Inspired Salads` },
  { title: `ilili BOX`, subtitle: `Inspired Mediterranean` },
]
