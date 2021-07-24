import { db } from "./firebase";

export default function setOrder(roomID, newOrder, cb){
  const refs = db.collection('rooms').doc(roomID);
  if(!roomID) return;
  db.runTransaction((transaction) => {
    return transaction.get(refs).then((refDoc) => {
      if(!refDoc.exists) {
        console.log('data not exists')
        return [];
      }
      const oldOrder = refDoc.data().order;
      const existData = newOrder.filter(e => oldOrder.find(item => item === e)); // 他の誰かが消してしまったデータを除外
      const unexistData = oldOrder.filter(e => !newOrder.find(item => item === e)); // 他の誰かが新しく追加したデータを含める
      const result = existData.concat(unexistData);
      transaction.set(refs, {
        order: result
      });
      return result;
    })
  }).then(res => {
    if(typeof cb === 'function') cb(res)
  }).catch(e => console.log(e));
}