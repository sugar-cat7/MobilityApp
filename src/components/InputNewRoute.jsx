import React, { useState } from 'react';
import { db } from '../lib/firebase';
import addData from '../lib/addData'
import styles from "./InputNewRoute.module.css";
import { Button } from '@material-ui/core';

const roomsRef = db.collection('rooms')

// 新しい目的地を追加
export const InputNewRoute = (props) => {
    const [to, setTo] = useState("")
    const [toList, setToList] = useState([])

    // inputの値を取得
    const handleChange = (e) => {
        setTo(() => e.target.value)
    }

    // inputを空にする
    const deleteValue = () => {
        setTo(() => "")
    }

    // 目的地を追加
    const addRoute = (e) => {
        if (!to) {
            alert("経由地点が空欄です");
            return;
        }
        addData(props.roomID, {
          location_name: to,
          tag: to
        }, props.updateDatas);

        deleteValue();
        e.preventDefault();
    };

    const addCurrentPos = () => {
        const liff = require('@line/liff');
        if(liff.isInClient()){
            liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID }).then(() => {
                liff.getProfile().then(profile => {
                    const name = profile.displayName;
                    navigator.geolocation.getCurrentPosition((position) => {
                        const pos = String(position.coords.latitude) + String(position.coords.longitude);
                        addData(props.roomID, {
                            location_name: pos,
                            tag: name + "の現在位置"
                        }, props.updateDatas);
                    })
                });
            });
        }else{
            const name = "匿名ユーザー";
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = String(position.coords.latitude) + ',' +  String(position.coords.longitude);
                console.log(pos)
                addData(props.roomID, {
                  location_name: pos,
                  tag: name + "の現在位置"
                }, props.updateDatas);
            });
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
              <Button color="primary" variant="contained" onClick={addRoute}>追加する</Button>
            </div>
            <div className={styles.container}>
                <Button color="primary" onClick={addCurrentPos} variant="contained">現在地を追加</Button>
            </div>
        </>
    )
}