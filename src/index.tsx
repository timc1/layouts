import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import globalStyles from './shared/globalStyles'
import { Global } from '@emotion/core'

ReactDOM.render(
  <>
    <Global styles={globalStyles} />
    <App />
  </>,
  document.getElementById('root')
)
