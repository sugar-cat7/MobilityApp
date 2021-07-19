### プロジェクトをクローンしたらやること

1. `yarn install`
2. 環境変数設定

- .env.local に ↓ 　\*の部分を修正

```
NEXT_PUBLIC_FIREBASE_API_KEY=*****
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=*****
NEXT_PUBLIC_FIREBASE_PROJECT_ID=*****
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=*****
NEXT_PUBLIC_FIREBASE_APP_ID=*****
```

3. エミュレータを起動する, `yarn emulators`
   - Java のランタイムで動いているので,Java を入れておいてください

java が入ってない場合

```
mac OS の場合
$ brew install java11
環境変数はメッセージ通りに設定する

$ java -version
openjdk version "11.0.10" 2021-01-19
OpenJDK Runtime Environment (build 11.0.10+9)
OpenJDK 64-Bit Server VM (build 11.0.10+9, mixed mode)
みたいなメッセージが表示されたらOK
```

4. `yarn emulators` → http://localhost:4000 にアクセス(一旦 firestore しか入れてない)

5. `yarn dev` next 側のサーバーを起動させる

### 動作確認

### ディレクトリの簡単な説明

```
.
├── README.md  #読む
├── firebase*.json #firebaseの設定部分
├── next.config.js #nextの諸々の設定部分
├── node_modules #無視で良い
├── package.json #必要なものが記載されてる、買い物リスト的な
├── public #画像とかおくところhttps://nextjs.org/docs/basic-features/static-file-serving
├── src #基本的にここの中を編集
├── styles #ここに書く必要はない
└── yarn.lock #勝手にinstallされるので気にしない

src
├── components #例えばボタンとか良い感じの入力フォームとか自作したら再利用するためにここに置く
├── lib #カスタムhookとか分割しておきたいロジック部分とか置く
└── pages #メインのページ -> 'pages/index.js → /'  'pages/blog/index.js → /blog'みたいにルーティングされる
```

### その他

- 開発はブランチを切って作業, 変更は PR で
- CSS は頑張る(next の公式は css module 推しなので css module で良さそう)
- 何もわからんって人は[これ](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)をやる
