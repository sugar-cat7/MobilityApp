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

  // dbが更新された時に呼び出してリロードする
  const updateDatas = () => {
    if(!roomID){
      console.log("roomID is undifined");
      return;
    }
    db.collection('rooms').doc(roomID).collection('waypoints').get().then((snapshot) => {
      const items = [];
      snapshot.forEach((document) => {
        const doc = document.data();
        items.push({
          id: document.id,
          location_name: doc.location_name
        });
      });
      setDatas(items);
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
    setDatas(arrayMove(datas, removedIndex, addedIndex));
    // fieldの書き換え処理を追記する
  };

  return (
    <>
      <div>roomId : {roomID}</div>
      <InputNewRoute roomID={roomID} />
      <DraggableList items={datas} onDrop={onDrop} update={updateDatas} roomID={roomID}/>
      <MakeRoute />
    </>
  );
};

export default Home;
