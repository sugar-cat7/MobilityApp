import React, { useState, useCallback, useEffect } from "react";
import { db } from "../lib/firebase";

const Home = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  //クリックされると発火
  const onClickHandler = useCallback(() => {
    //dbにデータを追加してる
    const ref = db.collection("test/texts/text");
    ref
      .add({
        bodyText: input,
        createdAt: new Date(),
      })
      .then(() => {
        alert("success!");
        setInput("");
      })
      .catch((err) => {
        alert("fail!", err.message);
      });
  }, [input]);

  //初回レンダー後のみ発火
  useEffect(() => {
    const ref = db.collection("test/texts/text");
    const tmpList = [];
    const unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        tmpList.push({
          id: doc.id,
          bodyText: data.bodyText,
          createdAt: data.createdAt,
        });
      });
    });
    setOutput(tmpList);
    return unsubscribe; //監視を解除
  }, []);

  return (
    <>
      <h1>
        下のテキストボックスに何か入れてローカルのFirestoreに保存されてるか確認してね
      </h1>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={onClickHandler}> Send!!!! </button>
      {output &&
        output.map((op) => {
          return <div key={op.id}>テキスト:{op.bodyText}</div>;
        })}
    </>
  );
};

export default Home;
