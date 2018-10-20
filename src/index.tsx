import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { PresentationContextProvider } from './PresentationContextProvider'
import { App } from './core'
import 'nprogress/nprogress.css'

ReactDOM.render(
  <PresentationContextProvider>
    <App />
  </PresentationContextProvider>,
  document.getElementById('root')
)

const hot = (module as any).hot

if (hot) {
  hot.accept(() => {})
}
