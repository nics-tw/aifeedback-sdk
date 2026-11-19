# 子資源完整性（SRI）

為確保瀏覽器載入的 SDK 檔案未遭竄改，引入時請加上 [Subresource Integrity (SRI)](https://developer.mozilla.org/zh-TW/docs/Web/Security/Subresource_Integrity) 雜湊值。若檔案內容與雜湊值不符，瀏覽器將拒絕執行該檔案。

## 版本雜湊表

| 版本  | 檔案                  | integrity                                                                 |
| ----- | --------------------- | ------------------------------------------------------------------------- |
| 1.1.0 | `feedback-sdk.min.js` | `sha384-3B+uPvIZL8Ybbj6eQvd/ZWK5neMh8t0NYo2RXE7EIKurpQ1Z4jtNGZyDi4/2vDhP` |
| 1.0.0 | `feedback-sdk.min.js` | `sha384-4gBTUL+8nMx9Liq6QYD/iCTPCVtbK2xwRsYxDo4OUr5sjU7I0uPI67xHdEEb6F+d` |

## 使用方式

SDK 可從下列位置引入，兩者檔案內容相同，使用相同的 `integrity` 值。請使用與版本對應的雜湊值。

| 來源           | 網址                                                                |
| -------------- | ------------------------------------------------------------------- |
| 雲端服務       | `https://aifeedback.nics.nat.gov.tw/sdk/<版本>/feedback-sdk.min.js` |
| 機關地端 Agent | `https://{機關地端Agent路徑}/sdk/<版本>/feedback-sdk.min.js`        |

**雲端服務**

```html
<script
  src="https://aifeedback.nics.nat.gov.tw/sdk/1.1.0/feedback-sdk.min.js"
  integrity="sha384-3B+uPvIZL8Ybbj6eQvd/ZWK5neMh8t0NYo2RXE7EIKurpQ1Z4jtNGZyDi4/2vDhP"
  crossorigin="anonymous"
></script>
```

**機關地端 Agent**（請將 `{機關地端Agent路徑}` 替換為貴機關地端 Agent 的實際網域與路徑）

```html
<script
  src="https://{機關地端Agent路徑}/sdk/1.1.0/feedback-sdk.min.js"
  integrity="sha384-3B+uPvIZL8Ybbj6eQvd/ZWK5neMh8t0NYo2RXE7EIKurpQ1Z4jtNGZyDi4/2vDhP"
  crossorigin="anonymous"
></script>
```

> [!NOTE]
> 跨網域載入時必須加上 `crossorigin="anonymous"`，且提供 SDK 的伺服器需回應 `Access-Control-Allow-Origin` 標頭，否則瀏覽器會因無法驗證完整性而拒絕載入。

## 自行驗證雜湊值

可使用下列指令計算檔案的 SRI 雜湊值，並與上表比對：

```bash
echo "sha384-$(openssl dgst -sha384 -binary feedback-sdk.min.js | openssl base64 -A)"
```
