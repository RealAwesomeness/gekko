const _ = require('lodash');
const fs = require('fs');
const request = require('request-promise');
const Promise = require('bluebird');

request({
  url: 'https://tradeogre.com/api/v1/markets',
  headers: {
    Connection: 'keep-alive',
    'User-Agent': 'Request-Promise',
  },
  json: true,
})
.then(body => {
  if (!body) {
    throw new Error('Unable to fetch list of assets, response was empty');
  }

  return body;
})
.then(results => {
  let assets = [];
  let currencies = [];
  for(var key in results) {
    assets.append(key.substring(4))
    currencies.append(key.substring(0,3))
  }

  let markets = _.map(results, market => {
    return {
      pair: [
        market.pair.substring(3, 6).toUpperCase(),
        market.pair.substring(0, 3).toUpperCase()
      ],
      minimalOrder: {
        amount: market.minimum_order_size,
        unit: 'asset',
      },
    };
  });

  return { assets: assets, currencies: currencies, markets: markets };
})
.then(markets => {
  fs.writeFileSync('../../exchanges/bitfinex-markets.json', JSON.stringify(markets, null, 2));
  console.log(`Done writing Bitfinex market data`);
})
.catch(err => {
  console.log(`Couldn't import products from Bitfinex`);
  console.log(err);
});
