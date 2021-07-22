"use strict";
const functions = require("firebase-functions");
const express = require("express");
const line = require("@line/bot-sdk");
// import functions from "../src/lib";
const config = {
  channelSecret: "83fd32ca0dc0c94b78f38f5c3eb5f368", // LINE Developersでの準備②でメモったChannel Secret
  channelAccessToken:
    "hI5BbF3p9dCMuEyeJjFUJqksw6Eh4DfLGR4tNpW4OSu8VGzh0Ebgr+NTWOtUMGIoVjopD/3r9sKPGI0I57xEdY0mScGE1bATyqSKU5iSxIo/UfXDOkG+KQQG0qfD2brO1zQIL2ZkZothlULqBF0XBgdB04t89/1O/w1cDnyilFU=", // LINE Developersでの準備②でメモったアクセストークン
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

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text + "を受け取りました。",
  });
}

exports.app = functions.https.onRequest(app);
