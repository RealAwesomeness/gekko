const _ = require('lodash');
const subscriptions = require('../subscriptions');
const config = require('../core/util').getConfig();
const express = requite("express")

const app = express();
const restfulAPI = function() {
  _.bindAll(this);
  this.advicePrice = 0
  this.adviceTime = moment();
}
restfulAPI.prototype.processAdvice = function(advice) {
  if (config.restfulAPI.enabled) {
    this.advicePrice = this.price;
    this.adviceTime = advice.date;
  
    var response = {
      'exchange':config.watch.exchange),
      'recomentdation':advice.recommendation,
      'asset':config.watch.asset,
      'time':this.adviceTime,
      'priceAtBuy':this.advicePrice
    }
  
    setResponse(response);
  }
}
module.exports = restfulAPI;
