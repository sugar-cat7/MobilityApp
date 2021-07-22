import { db } from "../lib/firebase";

export default function sampleData(roomID){
  db.collection('rooms').doc(roomID).collection('waypoints').add({
    location_name: "つくば駅"
  })
  db.collection('rooms').doc(roomID).collection('waypoints').add({
    location_name: "筑波大学"
  })
  db.collection('rooms').doc(roomID).collection('waypoints').add({
    location_name: "イーアス"
  })
}