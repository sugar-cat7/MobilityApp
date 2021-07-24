"use strict";
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const line = require("@line/bot-sdk");
const config = {
  channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECLET, // LINE Developersでの準備②でメモったChannel Secret
  channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN, // LINE Developersでの準備②でメモったアクセストークン
};

const app = express();

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((result) => console.log("error!!!"));
});

const client = new line.Client(config);

function addData(roomID, to, cb) {
  const ref = db.collection("rooms").doc(roomID);

  db.runTransaction((transaction) => {
    return transaction.get(ref).then((doc) => {
      const id = nanoid();
      if (doc.exists) {
        transaction.update(ref, {
          order: fieldval.arrayUnion(id),
        });
        transaction.set(ref.collection("waypoints").doc(id), to);
      } else {
        transaction.set(doc, {
          order: [id],
        });
        transaction.set(ref.collection("waypoints").doc(id), to);
      }
      return true;
    });
  })
    .then(() => {
      cb();
    })
    .catch((e) => {
      // transaction.setはfieldがない場合初期化しなければエラーが起きるのでデータを初期化
      if (e.code === "invalid-argument") {
        ref
          .set({
            order: [],
          })
          .then(() => {
            addData(roomID, to, cb);
          });
      } else {
        console.log(e);
      }
    });
}

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  var mention = "@mobility.app-bot";
  if (event.message.text.includes(mention)) {
    var addPoint = event.message.text.replace(mention, " ");
    addData(
      event.source.roomId,
      { location_name: addPoint, tag: addPoint },
      null
    );
    const obj = {
      type: "flex",
      altText: "This is a Flex Message",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "Hello,",
            },
            {
              type: "text",
              text: "World!",
            },
          ],
        },
      },
    };
    return client.replyMessage(event.replyToken, obj);
  }
}

exports.app = functions.https.onRequest(app);
