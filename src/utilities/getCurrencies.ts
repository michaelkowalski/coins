const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');
const client = new CoinpaprikaAPI();

export const getCurrencies: () => Promise<any> = async () =>
  new Promise((resolve) => {
    client
      .getCoins()
      .then((coins: []) => resolve(coins))
      .catch((e: {message: any}) => {
        console.log(`Error: ${e.message}`);
        resolve([]);
      });
  });

export const getTicker: (coinId: string) => Promise<any> = async (coinId) =>
  new Promise((resolve) => {
    client
      .getTicker({coinId})
      .then((coins: []) => resolve(coins))
      .catch((e: {message: any}) => {
        console.log(`Error: ${e.message}`);
        resolve([]);
      });
  });
