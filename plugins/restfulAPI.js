const _ = require('lodash');
const subscriptions = require('../subscriptions');
const config = require('../core/util').getConfig().restfulAPI;
const express = requite("express")

const app = express();
const restfulAPI = function() {
  app.listen(3000, () => {
      console.log("Server running on port 3000");
          app.get("/restfulAPI", (request, response, next) => {
              response.json({'exchange':config.watch.exchange,'advice':advice.recommendation,'asset':config.watch.asset,'currency':config.watch.currency,'price':this.price});
          });
  })
}

module.exports = restfulAPI;
