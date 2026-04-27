# GitHub Pages デプロイ手順

## 概要

このプロジェクトは GitHub Actions を使って `main` ブランチへの push を契機に自動的に GitHub Pages へデプロイされます。

```
main ブランチに push
    ↓
GitHub Actions が起動
    ↓
npm ci → npm run build（静的ファイルを out/ に生成）
    ↓
peaceiris/actions-gh-pages が out/ を gh-pages ブランチに push
    ↓
GitHub Pages が gh-pages ブランチを配信
    ↓
https://Rihitonnnu.github.io/portfolio で公開
```

---

## 初回セットアップ

### 1. GitHub でリポジトリを作成

[https://github.com/new](https://github.com/new) にアクセスし、以下の設定でリポジトリを作成します。

| 項目 | 値 |
|------|-----|
| Repository name | `portfolio` |
| Visibility | Public（GitHub Pages 無料枠は Public のみ） |
| Initialize | チェックなし（ローカルから push するため） |

### 2. ローカルリポジトリにリモートを追加して push

```bash
git remote add origin https://github.com/Rihitonnnu/portfolio.git
git push -u origin main
```

push すると GitHub Actions が自動で起動し、`gh-pages` ブランチが作成されます。

### 3. GitHub Pages を有効化

リポジトリの **Settings → Pages** を開き、以下のように設定します。

| 項目 | 値 |
|------|-----|
| Source | Deploy from a branch |
| Branch | `gh-pages` |
| Directory | `/ (root)` |

**Save** をクリックすると数分後に公開されます。

公開 URL: `https://Rihitonnnu.github.io/portfolio`

---

## ワークフローファイルの説明

ファイルパス: [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]   # main への push で自動実行
  workflow_dispatch:    # GitHub UI から手動実行も可能

permissions:
  contents: write       # gh-pages ブランチへの書き込み権限

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # リポジトリをチェックアウト
      - uses: actions/checkout@v4

      # Node.js 22 をセットアップ（npm キャッシュ有効）
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      # 依存関係をクリーンインストール
      - run: npm ci

      # Next.js を静的エクスポート（out/ ディレクトリに出力）
      - run: npm run build

      # out/ を gh-pages ブランチに push
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 各ステップの補足

| ステップ | 説明 |
|----------|------|
| `actions/checkout@v4` | ソースコードを取得 |
| `actions/setup-node@v4` | Node.js をセットアップ。`cache: npm` で `node_modules` をキャッシュして速度向上 |
| `npm ci` | `package-lock.json` を元に厳密なクリーンインストール。`npm install` より CI 向き |
| `npm run build` | `next build` を実行。`next.config.ts` の `output: 'export'` により `out/` に静的ファイルを生成 |
| `peaceiris/actions-gh-pages@v4` | `out/` の中身を `gh-pages` ブランチに自動コミット＆push |

---

## デプロイの確認方法

### GitHub Actions の実行状況

リポジトリの **Actions** タブで確認できます。

- 緑のチェック: デプロイ成功
- 赤のバツ: デプロイ失敗（ログを確認してください）

### 手動でデプロイを実行する

**Actions → Deploy to GitHub Pages → Run workflow** から手動実行できます（`workflow_dispatch` トリガー）。

---

## next.config.ts の静的エクスポート設定

GitHub Pages への配信に必要な設定が `next.config.ts` に入っています。

```ts
const nextConfig = {
  output: "export",          // 静的ファイルとして out/ に出力
  basePath: "/portfolio",    // リポジトリ名に合わせたベースパス
  images: { unoptimized: true }, // 静的エクスポートでは画像最適化APIが使えないため
};
```

リポジトリ名を変更した場合は `basePath` も合わせて変更してください。

---

## Formspree の環境変数設定

お問い合わせフォームに Formspree を使う場合、環境変数 `NEXT_PUBLIC_FORMSPREE_ID` が必要です。

### ローカル開発時

`.env.local` を作成します（`.gitignore` により Git 管理外）。

```
NEXT_PUBLIC_FORMSPREE_ID=あなたのFormspreeID
```

### GitHub Actions での設定

GitHub Actions でビルド時に環境変数を使いたい場合は、リポジトリの **Settings → Secrets and variables → Actions → New repository secret** で `NEXT_PUBLIC_FORMSPREE_ID` を登録し、ワークフローに追記します。

```yaml
      - run: npm run build
        env:
          NEXT_PUBLIC_FORMSPREE_ID: ${{ secrets.NEXT_PUBLIC_FORMSPREE_ID }}
```

---

## トラブルシューティング

### ページが表示されない（404）

- GitHub Pages の Source が `gh-pages` ブランチになっているか確認
- Actions が成功しているか確認
- 有効化後、反映まで数分かかる場合があります

### CSS/JS が読み込まれない

`next.config.ts` の `basePath` がリポジトリ名と一致しているか確認してください。

```ts
basePath: "/portfolio",  // リポジトリ名と一致させる
```

### Actions が失敗する

Actions タブのログを確認してください。よくある原因:

- TypeScript の型エラー（`npm run build` が失敗）
- `package-lock.json` がコミットされていない（`npm ci` が失敗）
