import React, { useState } from 'react';
import { BasicButton } from './BasicButton';

// 新しい目的地を追加
export const InputNewRoute = () => {
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
        setToList(toList.concat(to))
        deleteValue()
    }

    return (
        <>
            <h1>tolist</h1>
            <h1>{toList}</h1>
            <input value={to} onChange={handleChange} type="text" />
            <BasicButton onClick={addRoute} label={"追加する"} />
        </>
    )
}