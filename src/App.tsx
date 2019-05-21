import React from 'react'
import Home from './home'
import CanalStreetMarket from './canalstreet.market/index'
import AnimatedNav from './animated-nav/index'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route
          path="/canalstreet.market/:section?"
          component={CanalStreetMarket}
        />
        <Route path="/animated-nav" component={AnimatedNav} />
      </Router>
    </>
  )
}
