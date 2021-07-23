import React, { useState } from 'react';
import { BasicButton } from './BasicButton';
import { db } from '../lib/firebase';
import addData from '../lib/addData'

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
    const addRoute = () => {
        if (!to) {
            alert("新しい目的地を入力してください");
            return;
        }
        addData(props.roomID, to, props.updateDatas);

        deleteValue();
    };

    return (
        <>
            <h1>tolist</h1>
            <input value={to} onChange={handleChange} type="text" />
            <BasicButton onClick={(to) => addRoute(to)} label={"追加する"} />
        </>
    )
}