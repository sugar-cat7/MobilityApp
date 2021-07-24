"use strict";
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const nanoid = require("nanoid");
const line = require("@line/bot-sdk");
const config = {
  channelSecret: process.env.LINE_CHANNEL_SECLET, // LINE Developersでの準備②でメモったChannel Secret
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // LINE Developersでの準備②でメモったアクセストークン
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
      const id = nanoid.nanoid();
      if (doc.exists) {
        transaction.update(ref, {
          order: fieldval.arrayUnion(id),
        });
        transaction.set(ref.collection("waypoints").doc(id), to);
      } else {
        transaction.set(ref, {
          order: [id],
        });
        transaction.set(ref.collection("waypoints").doc(id), to);
      }
      return true;
    });
  })
    .then(() => {
      if (typeof cb == "function") cb();
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

  const replyMessageCardTemplate = {
    type: "flex",
    altText: "This is a Flex Message",
    contents: {
      type: "bubble",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "かんたん経路くん",
            color: "#FFFFFF",
            weight: "bold",
            align: "center",
          },
        ],
      },
      hero: {
        type: "image",
        url: "https://2.bp.blogspot.com/-AJw0SFWdLtI/VUIJuN6RyMI/AAAAAAAAtYI/oXi74oTbAGw/s800/car_jidou_unten.png",
        size: "lg",
        align: "center",
        gravity: "center",
        margin: "none",
        action: {
          type: "uri",
          label: "かんたん経路くんで確認する",
          uri: "https://liff.line.me/1656243134-07POGapz",
        },
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              uri: "https://liff.line.me/1656243134-07POGapz",
              label: "かんたん経路くんで確認する",
            },
            style: "secondary",
          },
        ],
      },
      action: {
        type: "uri",
        label: "action",
        uri: "https://liff.line.me/1656243134-07POGapz",
      },
      styles: {
        header: {
          backgroundColor: "#00B900",
        },
      },
    },
  };

  if (
    /^(簡単経路君|かんたん経路くん|かんたん経路君|簡単経路くん)$/.test(
      event.message.text
    )
  ) {
    const replyMessage = [
      {
        type: "text",
        text: "こんにちは、かんたん経路くんです！\n  かんたん経路くん [目的地]を入力して送信すると自動的に目的地が追加されるよ！",
      },
      replyMessageCardTemplate,
    ];
    return client.replyMessage(event.replyToken, replyMessage);
  }

  if (
    /^(簡単経路君|かんたん経路くん|かんたん経路君|簡単経路くん)/.test(
      event.message.text
    )
  ) {
    const mention = event.message.text.match(
      /^(簡単経路君|かんたん経路くん|かんたん経路君|簡単経路くん)/
    );
    const addPoint = event.message.text.replace(mention[0], " ");
    console.log(event.source.roomId);
    addData(
      event.source.roomId,
      { location_name: addPoint, tag: addPoint },
      null
    );
    const replyMessage = [
      {
        type: "text",
        text: `目的地${addPoint}が追加されたよ！`,
      },
      replyMessageCardTemplate,
    ];
    return client.replyMessage(event.replyToken, replyMessage);
  }
}

exports.app = functions.https.onRequest(app);
