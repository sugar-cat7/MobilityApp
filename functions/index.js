
const firebase = require("firebase");
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()
// import "firebase/functions";
// const functions = require("firebase-functions");
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV === "development") {
  //window.location.hostname === "localhost"がSSRの影響で使えないので。。。
  console.log(
    "testing locally -- hitting local functions and firestore emulators"
  );

  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}

const db = firebase.firestore();
const fieldval = firebase.firestore.FieldValue;

function addData(roomID, to = "つくば駅", cb){
  db.collection('rooms').doc(roomID).collection('waypoints').add({
    location_name: to
  }).then((docRef) => {
    db.collection('rooms').doc(roomID).get().then(doc => {
      if(doc.exists){
        db.collection('rooms').doc(roomID).update({
          order: fieldval.arrayUnion(docRef.id)
        }).then(() => {
          if(cb) cb();
        });
      }else{
        db.collection('rooms').doc(roomID).set({
          order: [docRef.id]
        }).then(() => {
          if(cb) cb();
        });
      }
    })
  })
}

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
console.log(req.body)
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
      const roomID = event.source.groupId
      addData(roomID, addPoint)
      const obj = {
        type: "text",
        text: addPoint + "を追加しました。",
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
