# 版本更新日誌

本檔案記錄了此專案所有重要的變更。

本檔案的格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
且本專案遵循[語意化版本](https://semver.org/lang/zh-TW/)規範。

## [未發佈]

## [1.1.0] - 2026-11-19

### 新增

- `feedbackRating` 新增 `"decent"` 與 `"weak"` 兩個評分選項。
- 範例頁面新增「三元／五元」評分模式切換，可分別測試原有與新增的評分選項。

### 變更

- `feedbackRating` 驗證失敗時的錯誤訊息改為列出全部五個允許值。
- SDK 改由雲端服務（`https://aifeedback.nics.nat.gov.tw/sdk/<版本>/feedback-sdk.min.js`）與機關地端 Agent（`https://{機關地端Agent路徑}/sdk/<版本>/feedback-sdk.min.js`）提供，不再提供 jsDelivr CDN 引入方式。
- 新增 `SRI.md`，列出各版本的 SRI 雜湊值。

## [1.0.0] - 2025-06-14

### 新增

- AI Feedback SDK 初始版本發佈。
- 核心函式 `init()` 和 `submit()`，用於提交回饋。
- 用於建構專案的 Webpack 設定。
- 用於確保程式碼品質與風格一致性的 ESLint 和 Prettier。
- 專案文件 (`README.md`, `CONTRIBUTING.md`, `LICENSE`)。
