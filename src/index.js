import * as React from "react"
import ReactDom from 'react-dom'
import "./assets/scss/app.scss"
import App from './pages/App'

ReactDom.render(
  <App/>,
  document.querySelector('#app')
)