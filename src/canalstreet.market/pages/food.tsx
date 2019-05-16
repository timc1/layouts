import React from 'react'
import { Header } from './shared'
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
      />
    </>
  )
}
