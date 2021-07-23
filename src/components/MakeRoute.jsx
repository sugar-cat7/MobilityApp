import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import styles from "./MakeRoute.module.css";

export const MakeRoute = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [url, setUrl] = useState("");
    
    const fetchLocationHere = async () => {
        // 現在の位置情報を取得
        
    }

    const makeRoute = () => {
        // 経路を作成する処理を実行？
        const googlemapBaseUrl = "https://www.google.co.jp/maps/dir/?api=1";
        const items = props.items
        const locationOrder = items.map(item => item.location_name)
        const startHere = props.startHere
        if (!startHere) {
            const originUrl = "&origin=" + locationOrder[0]
            const destinationUrl = "&destination=" + locationOrder[locationOrder.length - 1]
            const waypointsUrl = "&waypoints=" + locationOrder.slice(1, locationOrder.length - 1).join("|")
            const mergedUrl = googlemapBaseUrl + originUrl + destinationUrl + waypointsUrl
            setUrl(mergedUrl)
        } else {
            const destinationUrl = "&destination=" + locationOrder[locationOrder.length - 1]
            const waypointsUrl = "&waypoints=" + locationOrder.slice(0,locationOrder.length - 1).join("|")
            const mergedUrl = googlemapBaseUrl + destinationUrl + waypointsUrl
            setUrl(mergedUrl)
        }
        
        
        setIsClicked(true)
    }
    return (
        <div className={styles.margintop}>
            <Button color="primary" variant="contained" onClick={makeRoute} >経路を作成</Button>
            {url ?
                <div className={styles.margintop}>
                    <a href={url} className={styles.a}>Google Mapへ</a>
                </div>
                : null
            }
        </div>
    )
}