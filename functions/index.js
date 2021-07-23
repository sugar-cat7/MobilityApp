"use strict";
const functions = require("firebase-functions");
const express = require("express");
const line = require("@line/bot-sdk");
const config = {
  channelSecret: "c50bab059db1c49e3f4bd250f13ad581", // LINE Developersでの準備②でメモったChannel Secret
  channelAccessToken: "mMyWONiUXZ4sKIad1M5k2urnkO3RZngDMycxLP6+TsU9JfUtOdcOripsTAQ8Nk2rHWjkscZZzn/lXu0loTAL2nJwQ6U6SUq00QOeO/PSYJFO+LjZEqA2qLgbLKIgAssz1cyhR+aVdwD8BWH22YdBEwdB04t89/1O/w1cDnyilFU=", // LINE Developersでの準備②でメモったアクセストークン
};

const app = express();

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((result) => console.log("error!!!"));
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  var mention = "@mobility.app-bot";
    if (event.message.text.includes(mention)) {
      var addPoint = event.message.text.replace(mention," ");
      const obj = {
        type: "text",
        text: addPoint + "を受け取りました。",
      };
      return client.replyMessage(event.replyToken, obj);
    }
    else  {
      const obj = {
        type: "text",
        text: event.message.text + "を受け取りました。",
      };
      return client.replyMessage(event.replyToken, obj);
      }

  
}

exports.app = functions.https.onRequest(app);
