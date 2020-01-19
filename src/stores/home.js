import { actions, model } from '../utils/mirror';
import { fromJS } from 'immutable';
// import { $ajax } from '../../utils';

export default model({
  name: 'home',
  initialState: fromJS({
    count: 0,
  }),
  reducers: {
    setNum(state, count) {
      return state.set('count', count);
    },
  },
  effects: {
    async add(_, getState) {
      const { home } = getState();
      actions.home.setNum(home.get('count') + 1);
    },
    async inc(_, getState) {
      const { home } = getState();
      actions.home.setNum(home.get('count') - 1);
    },
  }
});