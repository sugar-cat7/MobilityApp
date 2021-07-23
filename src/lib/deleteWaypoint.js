import { db, fieldval } from "./firebase";

export default function deleteWaypoint(roomID, key, cb){
  const ref = db.collection('rooms').doc(roomID);
  db.runTransaction(async (transaction) => {
    await transaction.update(ref, {
      order: fieldval.arrayRemove(key)
    });
    await transaction.delete(ref.collection('waypoints').doc(key));
    return true;
  }).then((res) => {
    if(res && typeof cb === 'function') cb();
  }).catch(err => console.log(err))
}