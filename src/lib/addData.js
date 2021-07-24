import { db, fieldval } from "./firebase";
import { nanoid } from "nanoid";

// 引数のfirstのflagでエラー時の無限ループを防ぐ
export default function addData(roomID, to, cb){
  const ref = db.collection('rooms').doc(roomID);

  db.runTransaction((transaction) => {
    return transaction.get(ref).then(doc => {
      const id = nanoid();
      if(doc.exists){
        transaction.update(ref, {
          order: fieldval.arrayUnion(id)
        })
        transaction.set(ref.collection('waypoints').doc(id), to)
      }else{
        transaction.set(ref, {
          order: [id]
        });
        transaction.set(ref.collection('waypoints').doc(id), to);
      }
      return true
    })
  }).then(() => {
    if(typeof cb === 'function') cb();
  }).catch(e => {
    // transaction.setはfieldがない場合初期化しなければエラーが起きるのでデータを初期化
    if(e.code === "invalid-argument"){
      ref.set({
        order: []
      }).then(() => {
        addData(roomID, to, cb)
      });
    }else{
      console.log(e);
    }
  })
}