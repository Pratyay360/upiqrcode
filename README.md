<div align="center">

  <h1>⚡ upiqrcode</h1>
  <p><strong>Blazing-fast, lightweight UPI QR code generator producing clean SVG markup and intent URLs.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/upiqrcode"><img src="https://img.shields.io/npm/v/upiqrcode?color=blue&style=flat-square" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/upiqrcode"><img src="https://img.shields.io/npm/dm/upiqrcode?color=brightgreen&style=flat-square" alt="NPM Downloads" /></a>
    <a href="https://bundlephobia.com/package/upiqrcode"><img src="https://img.shields.io/bundlephobia/minzip/upiqrcode?style=flat-square" alt="Minified Size" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="License" /></a>
  </p>

  <p>
    <a href="https://dynamic-upi-qr.netlify.app/"><strong>Explore Documentation &amp; Live Demo &raquo;</strong></a>
  </p>

</div>

---

## ✨ Features

- **🚀 WebAssembly Powered:** Built in Rust and compiled via `wasm-pack` for peak performance.
- **🎨 Pure SVG Output:** No canvas or DOM dependencies—renders crystal-clear at any resolution.
- **📱 Universal Compatibility:** Works seamlessly across Node.js, browsers, Edge runtimes, and Cloudflare Workers.
- **🔗 Dual Output:** Returns both the visual SVG QR code and the raw UPI deep-link intent (`upi://pay?...`).
- **🛡️ Spec Compliant:** Adheres strictly to the NPCI Unified Payments Interface specifications.

---

## 📦 Installation

Install with your preferred package manager:

```bash
# npm
npm install upiqrcode

# pnpm
pnpm add upiqrcode

# yarn
yarn add upiqrcode

# bun
bun add upiqrcode
```

---

## 🚀 Quick Start

### 1. Node.js / TypeScript / ESM

```typescript
import { upiqrcode } from "upiqrcode";

async function generateInvoice() {
  const result = await upiqrcode({
    payeeVPA: "merchant@bank",
    payeeName: "Acme Corporation",
    amount: "499.00",
    currency: "INR",
    transactionNote: "Invoice #INV-2026-001",
    transactionId: "TXN1234567890",
  });

  console.log("UPI Intent Link:", result.intent);
  // Output: upi://pay?pa=merchant@bank&pn=Acme%20Corporation&am=499.00&cu=INR&tn=Invoice%20%23INV-2026-001&tr=TXN1234567890

  console.log("Raw SVG Code:\n", result.qr);
}

generateInvoice();
```

---

### 2. React / Next.js

```tsx
"use client";

import { useEffect, useState } from "react";
import { upiqrcode } from "upiqrcode";

export default function PaymentQRCode() {
  const [svg, setSvg] = useState<string>("");
  const [intent, setIntent] = useState<string>("");

  useEffect(() => {
    async function fetchQR() {
      const data = await upiqrcode({
        payeeVPA: "business@upi",
        payeeName: "My Online Store",
        amount: "1500.00",
        transactionNote: "Order #8821",
      });
      setSvg(data.qr);
      setIntent(data.intent);
    }

    fetchQR();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "1.5rem" }}>
      <h3>Scan to Pay</h3>
      {svg ? (
        <div
          style={{ width: 250, margin: "0 auto" }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p>Loading QR Code...</p>
      )}
      {intent && (
        <p>
          <a href={intent}>Click here to pay directly on mobile</a>
        </p>
      )}
    </div>
  );
}
```

---

### 3. Vanilla JavaScript (Browser / CDN)

Link the CDN script and use the `upiqrcode` function directly.

https://esm.sh/upiqrcode .. 

https://cdn.jsdelivr.net/npm/upiqrcode/+esm


https://unpkg.com/upiqrcode@1.5.5/upiqrcode.js



```html
<div id="qrcode-container"></div>

<script type="module">
  import { upiqrcode } from "https://cdn.jsdelivr.net/npm/upiqrcode/+esm";

  const { qr } = await upiqrcode({
    payeeVPA: "username@okhdfcbank",
    payeeName: "Rahul Sharma",
    amount: "250.00",
  });

  document.getElementById("qrcode-container").innerHTML = qr;
</script>
```

---

## 📖 API Reference

### `upiqrcode(params)`

```typescript
function upiqrcode(params: UpiqrcodeParams): Promise<UpiqrcodeResult>
```

#### Parameters (`UpiqrcodeParams`)

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `payeeVPA` | `string` | **Yes** | — | Payee Virtual Payment Address (e.g., `user@upi`). |
| `payeeName` | `string` | **Yes** | — | Name of the recipient or merchant. |
| `amount` | `string` | No | — | Transaction amount (e.g., `"100.00"`). |
| `minimumAmount` | `string` | No | — | Minimum transaction amount allowed. |
| `currency` | `string` | No | `"INR"` | 3-letter currency code (Standard: `INR`). |
| `transactionId` | `string` | No | — | Unique bank transaction reference ID (`tr`). |
| `transactionRef` | `string` | No | — | Merchant reference / order ID. |
| `transactionNote` | `string` | No | — | Short description or remark (`tn`). |
| `payeeMerchantCode`| `string` | No | — | 4-digit Merchant Category Code (MCC). |
| `transactionRefUrl`| `string` | No | — | Order URL / digital invoice URL (`url`). |

#### Return Value (`UpiqrcodeResult`)

| Property | Type | Description |
| :--- | :--- | :--- |
| `qr` | `string` | Complete `<svg>...</svg>` string ready to insert into DOM or file. |
| `intent` | `string` | Fully-encoded UPI intent link (`upi://pay?...`). |

---

## 🛠️ Building from Source

This package compiles Rust code to WebAssembly using [`wasm-pack`](https://rustwasm.github.io/wasm-pack/).

### Prerequisites

- [Rust & Cargo](https://rustup.rs/) (latest stable)
- [Node.js](https://nodejs.org/) (v18+)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Pratyay360/upiqrcode.git
cd upiqrcode

# 2. Build WebAssembly target
wasm-pack build --target bundler

# 3. Install JS dependencies
npm install
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or pull request on [GitHub](https://github.com/Pratyay360/upiqrcode).

---

## 📄 License

Distributed under the **Apache-2.0 License**. See [`LICENSE_APACHE`](./LICENSE_APACHE) for more information.
