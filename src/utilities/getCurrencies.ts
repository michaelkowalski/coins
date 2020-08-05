const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');

const getCurrencies: () => Promise<any> = async () => {
  const client = new CoinpaprikaAPI();

  try {
    return client.getCoins();
  } catch (e) {
    console.log(`Error fetching currencies: ${e.message()}`);
    return [];
  }
};

export default getCurrencies;
