import React, { useState } from 'react';
import { BasicButton } from './BasicButton';

export const MakeRoute = (props) => {
    const [toList, setToList] = useState(props.toList)

    const fetchLocationHere = async () => {
        // 現在の位置情報を取得
        
    }

    const makeRoute = () => {
        // 経路を作成する処理を実行？
    }

    return (
        <>
            <BasicButton label={"経路を作成する"} onClick={makeRoute} />
        </>
    )
}