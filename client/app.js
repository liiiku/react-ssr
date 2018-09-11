import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import { AppContainer } from 'react-hot-loader'

const root = document.getElementById('root')
const render = (component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const nextApp = require('./views/App').default
    render(nextApp)
  })
}