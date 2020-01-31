import React, {lazy, Suspense} from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// import {Home, About} from '../routes'
const About = lazy(() => import('./about'))
const Home = lazy(() => import('./home'))

const App = () => (
  <Router>
    <Suspense fallback={<div>loading</div>}>
      <Switch>
        <Route path='/' component={Home}></Route>
        <Route path='/about' component={About}></Route>
      </Switch>
    </Suspense>
  </Router>
)
export default App