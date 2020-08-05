import {pathOr} from 'ramda';

import {getTicker} from '../utilities/getCurrencies';
import {sleep} from '../utilities/sleep';

const currencies = {
  state: {
    items: {},
  },
  reducers: {
    fetchTickerStart(state: any, payload: any) {
      return {
        items: {
          ...state.items,
          [payload]: {
            loading: true,
          },
        },
      };
    },
    fetchTickerError(state: any, payload: any) {
      return {
        items: {
          ...state.items,
          [payload]: {
            loading: false,
            retry: true,
          },
        },
      };
    },
    fetchTickerSuccess(state: any, payload: any) {
      const {id, data} = payload;
      return {
        items: {
          ...state.items,
          [id]: {
            loading: false,
            retry: false,
            data,
          },
        },
      };
    },
  },
  effects: (dispatch: any) => ({
    async fetchTicker(payload: any, rootState: any) {
      const itemExists = pathOr(
        undefined,
        ['currencies', 'items', payload, 'data'],
        rootState,
      );

      if (!itemExists) {
        dispatch.currencies.fetchTickerStart(payload);

        let data = {error: 'Not started yet'};
        while (data.error) {
          data = await getTicker(payload);
          if (data.error) {
            dispatch.currencies.fetchTickerError(payload);
            await sleep(1000);
          } else {
            dispatch.currencies.fetchTickerSuccess({id: payload, data});
          }
        }
      }
    },
  }),
};

export default currencies;
