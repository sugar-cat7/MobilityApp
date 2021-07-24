import React, { useState } from "react";
import addData from "../lib/addData";
import styles from "./InputNewRoute.module.css";
import { Button } from '@material-ui/core';
import { NotLiffLocInfo } from './NotLiffLocInfo';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// 新しい目的地を追加
export const InputNewRoute = (props) => {
    const [to, setTo] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [name, setName] = useState()


  // inputの値を取得
  const handleChange = (e) => {
    setTo(() => e.target.value);
  };

  // inputを空にする
  const deleteValue = () => {
    setTo(() => "");
  };

  // 目的地を追加
  const addRoute = (e) => {
    if (!to) {
      alert("経由地点が空欄です");
      return;
    }
    addData(
      props.roomID,
      {
        location_name: to,
        tag: to,
      },
      props.updateDatas
    );

    deleteValue();
    e.preventDefault();
  };

    const addCurrentPosNotLiff = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = String(position.coords.latitude) + ',' +  String(position.coords.longitude);
            console.log(pos)
            addData(props.roomID, {
              location_name: pos,
              tag: name + "の現在位置"
            }, props.updateDatas);
        });
        setOpenDialog(false)
        setName("")
    }


    const addCurrentPos = () => {
        const liff = require('@line/liff');
        if(liff.isInClient()){
            liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID }).then(() => {
                liff.getProfile().then(profile => {
                    const name = profile.displayName;
                    navigator.geolocation.getCurrentPosition((position) => {
                        const pos = toString(position.coords.latitude) + toString(position.coords.longitude);
                        addData(props.roomID, {
                            location_name: pos,
                            tag: name + "の現在位置"
                        }, props.updateDatas);
                    })
                });
            });
        }else{
            setOpenDialog(true)
        }
    }

    return (
        <>
            <div className={styles.inputcontainer}>
                <form onSubmit={addRoute} className={styles.form}>
                <input
                    value={to}
                    onChange={handleChange}
                    className={styles.input}
                    type="text"
                    placeholder="追加の経由地点を入力してください"
                />
                </form>
              <Button color="primary" variant="contained" onClick={addRoute}>追加</Button>
            </div>
            <div className={styles.container}>
                <Button color="primary" onClick={addCurrentPos} variant="contained">現在地を追加</Button>
            </div>
            <NotLiffLocInfo openDialog={openDialog} setOpenDialog={setOpenDialog} addCurrentPosNotLiff={addCurrentPosNotLiff} setName={setName} />
        </>
    )
}
