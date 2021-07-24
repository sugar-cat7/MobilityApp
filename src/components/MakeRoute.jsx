import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import styles from "./MakeRoute.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export const MakeRoute = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [url, setUrl] = useState("");
    
    const onClick = () => {
        setIsClicked(true);
    }

    const makeRoute = (startHere) => {
        // 経路を作成する処理を実行？
        const googlemapBaseUrl = "https://www.google.co.jp/maps/dir/?api=1";
        const items = props.items
        if(items.length === 0){
            alert('経由地点が入力されていません');
            return;
        }
        const locationOrder = items.map(item => item.location_name)
        if (!startHere) {
            const originUrl = "&origin=" + locationOrder[0]
            const destinationUrl = "&destination=" + locationOrder[locationOrder.length - 1]
            let waypointsUrl = "&waypoints=" + locationOrder.slice(1, locationOrder.length - 1).join("|")
            if(waypointsUrl === "&waypoints=") waypointsUrl = ""; // 経由地点が存在しなければwaypointsUrlを消去
            const mergedUrl = googlemapBaseUrl + originUrl + destinationUrl + waypointsUrl
            setUrl(mergedUrl)
        } else {
            const destinationUrl = "&destination=" + locationOrder[locationOrder.length - 1]
            let waypointsUrl = "&waypoints=" + locationOrder.slice(0, locationOrder.length - 1).join("|")
            if(waypointsUrl === "&waypoints=") waypointsUrl = ""; // 経由地点が存在しなければwaypointsUrlを消去
            const mergedUrl = googlemapBaseUrl + destinationUrl + waypointsUrl
            setUrl(mergedUrl)
        }
        setIsClicked(false);
    }


    return (
        <div className={styles.margintop}>
            <Button color="primary" variant="contained" onClick={onClick} >経路を作成</Button>
            {isClicked ? 
            <Dialog open={isClicked} onClose={() => setIsClicked(false)}>
                <div className={styles.dialogContainer}>
                    <div>出発地点を現在地に設定しますか？</div>
                    <div className={styles.popupButtonContainer}>
                        <div className={styles.popupButton}><Button color="primary" variant="contained" onClick={() => makeRoute(true)}>はい</Button></div>
                        <div className={styles.popupButton}><Button color="primary" variant="contained" onClick={() => makeRoute(false)}>いいえ</Button></div>
                    </div>
                </div>
            </Dialog>
            : null}
            {url ?
                <div className={styles.margintop}>
                    <a href={url} className={styles.a}>Google Mapへ</a>
                </div>
                : null
            }
        </div>
    )
}