import React, { useState, useCallback, useEffect } from "react";
import { db } from "../lib/firebase";
import sampleData from "../lib/sampledata";
import DraggableList from "../components/DraggableList";
import arrayMove from 'array-move';
import { InputNewRoute } from '../components/InputNewRoute';
import { MakeRoute } from '../components/MakeRoute';
import { useRouter } from "next/router";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [liff, setLiff] = useState();
  const [roomID, setRoomID] = useState('');
  const [order, setOrder] = useState([]);

  // dbが更新された時に呼び出してリロードする
  const updateDatas = () => {
    if(!roomID){
      console.log("roomID is undifined");
      return;
    }
    // dbから経路の順番を取得
    db.collection('rooms').doc(roomID).get().then((field) => {
      const newOrder = field.data().order;
      setOrder(newOrder);
      // 経由地点のデータを取得
      db.collection('rooms').doc(roomID).collection('waypoints').get().then((snapshot) => {
        const items = [];
        snapshot.forEach((document) => {
          const doc = document.data();
          items.push({
            id: document.id,
            location_name: doc.location_name
          });
        });
        if(!newOrder){
          // 順番のデータが取得できていない場合
          setDatas(items);
          return;
        }
        const orderedItems = [];
        newOrder.forEach(id => {
          const foundItem = items.find((item) => item.id === id);
          if(foundItem) orderedItems.push(foundItem);
          else{
            console.log(`id:${id} is exists in order data but did not find in documents.`)
          }
        });
        setDatas(orderedItems);
      });
    });
  }

  useEffect(() => {
    const liff = require('@line/liff');
    if(liff.isInClient()){
      liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID }).then(() => {
        if(!liff.isLoggedIn()){
          liff.login();
        }
        const context = liff.getContext();
        const roomID =  context.roomId || context.groupId;
        setRoomID(roomID);
        sampleData(roomID) // for debug
        sampleData(roomID, "筑波大学") // for debug
        sampleData(roomID, "東京駅") // for debug
        setLiff(liff);
      });
    }
  }, []);

  useEffect(() => {
    const liff = require('@line/liff');
    if(liff.isInClient()) return;
    if (router.asPath !== router.route) {
      if(router.query.roomID) {
        setRoomID(router.query.roomID);
      }
    }
  }, [router]);

  useEffect(() => {
    updateDatas();
  }, [roomID]);

  const onDrop = ({ removedIndex, addedIndex }) => {
    const newData = arrayMove(datas, removedIndex, addedIndex);
    setDatas(newData);
    // fieldの書き換え処理を追記する
    const newOrder = newData.map((data) => data.id);
    db.collection('rooms').doc(roomID).set({
      order: newOrder
    }).then(() => {
      updateDatas();
    });
  };

  return (
    <>
      <div>roomId : {roomID}</div>
      <DraggableList items={datas} onDrop={onDrop} update={updateDatas} roomID={roomID}/>
      <InputNewRoute />
      <MakeRoute />
    </>
  );
};

export default Home;
