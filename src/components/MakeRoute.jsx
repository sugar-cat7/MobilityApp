import React, { useState } from 'react';
import { BasicButton } from './BasicButton';
import { useRouter } from 'next/router';

export const MakeRoute = (props) => {
    const router = useRouter();
    
    const fetchLocationHere = async () => {
        // 現在の位置情報を取得
        
    }

    const makeRoute = () => {
        // 経路を作成する処理を実行？
        const googlemapBaseUrl = "https://www.google.co.jp/maps/dir/?api=1&travelmode=driving";
        const items = props.items
        const locationOrder = items.map(item => item.location_name)
        const startHere = props.startHere
        if (!startHere) {
            const originUrl = "&origin=" + locationOrder[0]
            const destinationUrl = "&destination=" + locationOrder[locationOrder.length - 1]
            const waypointsUrl = "&waypoints=" + locationOrder.slice(1, locationOrder.length - 1).join("|")
            const mergedUrl = googlemapBaseUrl + originUrl + destinationUrl + waypointsUrl
            router.push(mergedUrl)
        } else {
            const destinationUrl = "&destination=" + locationOrder[locationOrder.length - 1]
            const waypointsUrl = "&waypoints=" + locationOrder.slice(0,locationOrder.length - 1).join("|")
            const mergedUrl = googlemapBaseUrl + destinationUrl + waypointsUrl
            router.push(mergedUrl)
        }
        
    }
    
    return (
        <>
            <BasicButton label={"経路を作成する"} onClick={makeRoute} />
        </>
    )
}