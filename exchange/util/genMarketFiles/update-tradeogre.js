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
  var assets
  var currencies
  var markets
  for(var key in results) {
    assets.append(key.substring(4).toUpperCAse())
    currencies.append(key.substring(0,3).toUpperCase())
    markets.append({"pair": [key.substring(4).toUpperCase(), key.substring(0,3).toUpperCase()], "minimalOrder": {"amount" : "0.00001", "unit": "asset"}})
   }
  assets = _.uniq(assets)
  currencies = _.uniq(currencies)
  markets = _.uniq(markets)

  return { assets: assets, currencies: currencies, markets: markets };
})
.then(markets => {
  fs.writeFileSync('../../exchanges/tradeogre-markets.json', JSON.stringify(markets, null, 2));
  console.log(`Done writing TradeOgre market data`);
})
.catch(err => {
  console.log(`Couldn't import products from TradeOgre`);
  console.log(err);
});
