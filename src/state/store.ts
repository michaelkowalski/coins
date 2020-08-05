import {init} from '@rematch/core';

import currencies from './currencies';

const store = init({
  models: {
    currencies,
  },
});

export default store;
