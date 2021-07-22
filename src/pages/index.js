import React, { useState, useCallback, useEffect } from "react";
import { db } from "../lib/firebase";
import sampleData from "../lib/sampledata";
import DraggableList from "../components/DraggableList";
import arrayMove from 'array-move';
import useSWR from "swr";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [liff, setLiff] = useState();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const liff = require('@line/liff');
    liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID }).then(() => {
      if(!liff.isLoggedIn()){
        liff.login();
        setLiff(liff);
      }
      if(liff.isInClient()){
        const context = liff.getContext();
        const roomID =  context.roomId || context.groupId;
        setMsg(roomID) // for debug
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
      }else{
        setMsg('undifined')
      }
    });
  }, []);

  const onDrop = ({ removedIndex, addedIndex }) => {
    setDatas(arrayMove(datas, removedIndex, addedIndex));
    // fieldの書き換え処理を追記する
  };

  return (
    <>
      <div>roomId : {msg}</div>
      <DraggableList items={datas} onDrop={onDrop} />
    </>
  );
};

export default Home;
