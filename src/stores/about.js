import { model } from '../utils/mirror';
import { fromJS } from 'immutable';

export default model({
  name: 'about',
  initialState: fromJS({
  }),
  reducers: {
  },
  effects: {
    async test(_, getState) {
      console.log(getState());
    },
  }
});