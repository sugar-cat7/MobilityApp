import React, { useState, useCallback, useEffect } from "react";
import { db } from "../lib/firebase";
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
        setMsg(roomID)
        db.collection('rooms').doc(roomID).collection('waypoints').get().then((snapshot) => {
          const items = [];
          snapshot.forEach((document) => {
            const doc = document.data();
            alert(doc)
            items.push({
              id: document.id,
              location_name: doc.location_name
            });
            alert(doc.location_name)
          });
          setDatas(items);
        });
      }else{
        setMsg('undifined')
      }
    });
  }, []);

  return (
    <>
      <h1>
        下のテキストボックスに何か入れてローカルのFirestoreに保存されてるか確認してね
      </h1>
      <div>roomId : {msg}</div>
      {datas.map(i => {
        return (
          <div key={i.id}>
            {i.location_name}
          </div>
        )
      })}
    </>
  );
};

export default Home;
