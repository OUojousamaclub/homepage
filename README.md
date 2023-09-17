# 大阪大学お嬢様部公式ホームページ
大阪大学お嬢様部の公式ホームページのレポジトリです。

# 以下開発者向け

## ブランチの話
以下のブランチ構成で進めます
- main : 公開用（ここのソースコードがホームページになります）
- dev  : 開発用

### セットアップ
```cmd
git clone https://github.com/OUojousamaclub/homepage.git
cd homepage
git checkout -b dev
```
この状態でhtmlファイルを開くと作業中のホームページがみれるようになってます。

### 作業のキリがついたら
```
git add .
git commit -m "作業内容とかお気持ちとか"
git push origin dev
```

### 公開できる状態になったら
担当者に連絡してマージしてもらってください。



## あると便利なツール集
### browser-sync
コードの変更を検知して自動でリロードしてくれます
#### インストール
```
npm install -g browser-sync
```
#### 実行
```
browser-sync start --server --files *.html,css/*.css,js/*.js
```