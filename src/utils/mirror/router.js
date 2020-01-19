import * as React from 'react'
import PropTypes from 'prop-types'
import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history'

export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

const updateLocation = (method) => () => {
  const args = [];
  for (let len = arguments.length, key = 0; key < len; ++key) {
    args[key] = arguments[key];
  }
  return {
    type: CALL_HISTORY_METHOD,
    payload: { method: method, args }
  };
};

export const routerActions = {
  push: updateLocation('push'),
  replace: updateLocation('replace'),
  go: updateLocation('go'),
  goBack: updateLocation('goBack'),
  goForward: updateLocation('goForward'),
};

import { options } from './defaults'
import { dispatch } from './middleware'
import { actions } from './actions'
import { Router as ConnectedRouter } from "react-router";

export let history = null;

export default function Router({ history: _history, children, ...others }) {
  // Add `push`, `replace`, `go`, `goForward` and `goBack` methods to actions.routing,
  // when called, will dispatch the crresponding action provided by react-router-redux.
  actions.routing = Object.keys(routerActions).reduce((memo, action) => {
    memo[action] = (...args) => {
      dispatch(routerActions[action](...args))
    };
    return memo
  }, {});

  if (!_history) {
    _history = createHistory(others)
  }

  history = _history;

  return (
    <ConnectedRouter history={_history}>
      {children}
    </ConnectedRouter>
  )
}

Router.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.object
};

function createHistory(props) {

  const { historyMode } = options;

  const historyModes = {
    browser: createBrowserHistory,
    hash: createHashHistory,
    memory: createMemoryHistory,
  };

  history = historyModes[historyMode](props);

  return history;
}
