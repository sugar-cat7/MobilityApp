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

  useEffect(() => {
    const liff = require('@line/liff');
    if(liff.isInClient()){
      liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID }).then(() => {
        if(!liff.isLoggedIn()){
          liff.login();
        }
        const context = liff.getContext();
        const roomID =  context.roomId || context.groupId;
        setRoomID(roomID) // for debug
        sampleData(roomID) // for debug
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
        setLiff(liff);
      });
    }
  }, []);

  useEffect(() => {
    const liff = require('@line/liff');
    if(liff.isInClient()) return;
    if (router.asPath !== router.route) {
      setRoomID(router.query.roomID);
      const roomID = router.query.roomID
      setRoomID(roomID) // for debug
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
  }, [router]);

  const onDrop = ({ removedIndex, addedIndex }) => {
    setDatas(arrayMove(datas, removedIndex, addedIndex));
    // fieldの書き換え処理を追記する
  };

  return (
    <>
      <div>roomId : {roomID}</div>
      <DraggableList items={datas} onDrop={onDrop} />
      <InputNewRoute roomID={roomID} />
      <MakeRoute />
    </>
  );
};

export default Home;
