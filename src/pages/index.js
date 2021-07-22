import React, { useState, useCallback, useEffect } from "react";
import { db } from "../lib/firebase";
import useSWR from "swr";

//外部APIとかDBからのfetch
const fetcher = async () => {
  const testFetchData = [];
  const doc = await db.collection("test/texts/text").get();
  if (doc) {
    doc.forEach((d) => {
      const data = d.data();
      testFetchData.push({
        id: d.id,
        bodyText: data.bodyText,
        createdAt: data.createdAt,
      });
    });
  }
  return testFetchData;
};

const Home = () => {
  const [input, setInput] = useState("");

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

  const { data, error } = useSWR("firestore/test/texts/text", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  // if (!data) {
  //   return null;
  // }
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
      {data &&
        data.map((d) => {
          return <div key={d.id}>テキスト:{d.bodyText}</div>;
        })}
    </>
  );
};

export default Home;
