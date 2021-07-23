import React, { useState } from 'react';
import { BasicButton } from './BasicButton';

export const MakeRoute = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [url, setUrl] = useState("");
    
    const fetchLocationHere = async () => {
        // 現在の位置情報を取得
        
    }

    const makeRoute = () => {
        // 経路を作成する処理を実行？
        const googlemapBaseUrl = "https://www.google.co.jp/maps/dir/";
        const items = props.items
        console.log(items)
        const locationOrder = items.map(item => item.location_name)
        const followingUrl = locationOrder.join("/")
        const mergedUrl = googlemapBaseUrl + followingUrl
        setUrl(mergedUrl)
        
        setIsClicked(true)
    }
    if (isClicked) {
        return (
            <>
            <BasicButton label={"経路を作成する"} onClick={makeRoute} />
            <a className="btn btn-primary" href={url}>マップへ</a>
            </>
        )
    }
    return (
        <>
            <BasicButton label={"経路を作成する"} onClick={makeRoute} />
        </>
    )
}