const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');
const client = new CoinpaprikaAPI();

const getCurrencies: () => Promise<any> = async () =>
  new Promise((resolve) => {
    client
      .getCoins()
      .then((coins: []) => resolve(coins))
      .catch((e: {message: any}) => {
        console.log(`Error: ${e.message}`);
        resolve([]);
      });
  });

export default getCurrencies;
