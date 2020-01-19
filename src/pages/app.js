import * as React from "react";
import { Router, Route, Switch } from "../utils/mirror";
import { Suspense } from 'react';
import Loading from "react-loading";

import { Home, About } from "../routes";

export const App = () => {
  return (
    <Router basename='/' hashType='hashbang'>
      <Suspense
        fallback={<Loading delay={6000} color={"#8a54be"} height={"12%"} width={"12%"} type={'spinningBubbles'}
                           className="loadEffect"/>}>
        <Switch>
          <Route path="/" exact component={(props) => <Home {...props}/>}/>
          <Route path="/index" component={(props) => <Home {...props}/>}/>
          <Route path="/about" component={(props) => <About {...props}/>}/>
        </Switch>
      </Suspense>
    </Router>
  );
};
