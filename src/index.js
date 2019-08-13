import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import App from './App'
import './styles.css'
import DefaultsErrorBoundary from './DefaultsErrorBoundary'

if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  // 1000 is 1s to check accessibility issue
  axe(React, ReactDOM, 1000)
}
ReactDOM.render(
  <React.StrictMode>
    <DefaultsErrorBoundary>
      <App />
    </DefaultsErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app')
)
