import { db, fieldval } from "../lib/firebase";



export default function sampleData(roomID, to = "つくば駅"){
  db.collection('rooms').doc(roomID).collection('waypoints').add({
    location_name: to
  }).then((docRef) => {
    db.collection('rooms').doc(roomID).update({
      order: fieldval.arrayUnion(docRef.id)
    });
  })
}