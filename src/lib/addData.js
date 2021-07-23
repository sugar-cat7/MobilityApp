import { db, fieldval } from "./firebase";
import { nanoid } from "nanoid";

export default function addData(roomID, to = "つくば駅", cb){
  const ref = db.collection('rooms').doc(roomID);

  db.runTransaction((transaction) => {
    return transaction.get(ref).then(doc => {
      const id = nanoid();
      if(doc.exists){
        transaction.update(ref, {
          order: fieldval.arrayUnion(id)
        })
        transaction.set(ref.collection('waypoints').doc(id), {
            location_name: to
        })
      }else{
        transaction.set(doc, {
          order: [id]
        });
        transaction.set(ref.collection('waypoints').doc(id), {
          location_name: to
        });
      }
      return true
    }) 
  }).then(() => {
    cb();
  }).catch(e => console.log(e))
}