import * as React from "react";
import { render, defaults } from './utils/mirror';
import "./assets/scss/app.scss";
import { App } from "./pages/app";
import './stores';

defaults({
  historyMode: 'hash',
});

render(
  <App/>,
  document.querySelector("#app"),
);
