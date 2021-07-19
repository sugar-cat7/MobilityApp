import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import React, { useState, useCallback } from "react";
import { db } from "../lib/firebase";

const Home = () => {
  const [input, setInput] = useState("");

  const onClickHandler = useCallback(() => {
    const ref = db.collection("test");
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
    </>
  );
};

export default Home;
