import {
  createStore as _createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  location: null
};

function routerReducer() {
  const state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  const _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    type = _ref.type,
    payload = _ref.payload;
  if (type === LOCATION_CHANGE) {
    return { ...state, ...{ location: payload } };
  }
  return state;
}


import createMiddleware from './middleware'
import routerMiddleware from './routerMiddleware'

export let store;

export function createStore(models, reducers, initialState, middlewares = []) {

  const middleware = applyMiddleware(
    routerMiddleware(),
    ...middlewares,
    createMiddleware()
  );

  const enhancers = [middleware];

  let composeEnhancers = compose;

  // Following line to exclude from coverage report:
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    // Redux devtools extension support.
    if (global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
      composeEnhancers = global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    }
  }

  const reducer = createReducer(models, reducers);
  const enhancer = composeEnhancers(...enhancers);

  store = _createStore(reducer, initialState, enhancer);

  return store
}

export function replaceReducer(store, models, reducers) {
  const reducer = createReducer(models, reducers);
  store.replaceReducer(reducer)
}

function createReducer(models, reducers) {

  const modelReducers = models.reduce((acc, cur) => {
    acc[cur.name] = cur.reducer;
    return acc
  }, {});

  return combineReducers({
    ...reducers,
    ...modelReducers,
    routing: routerReducer
  })

}
