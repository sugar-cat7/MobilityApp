import { db, fieldval } from "./firebase";

export default async function addData(roomID, to = "つくば駅", cb){
  db.collection('rooms').doc(roomID).collection('waypoints').add({
    location_name: to
  }).then((docRef) => {
    db.collection('rooms').doc(roomID).get().then(doc => {
      if(doc.exists){
        db.collection('rooms').doc(roomID).update({
          order: fieldval.arrayUnion(docRef.id)
        }).then(() => {
          if(cb) cb();
        });
      }else{
        db.collection('rooms').doc(roomID).set({
          order: [docRef.id]
        }).then(() => {
          if(cb) cb();
        });
      }
    })
  })
}