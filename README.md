# upiqrcode

Generate UPI QR codes as SVG — compiled to WebAssembly.

[![npm](https://img.shields.io/npm/v/upiqrcode)](https://www.npmjs.com/package/upiqrcode)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE_APACHE)

## Installation

```bash
npm install upiqrcode
```

## Usage

### `upiqrcode(params)` → `Promise<UpiqrcodeResult>`

Generates a UPI payment QR code as an SVG string along with the UPI intent URL.

```tsx
import { useState, useEffect } from "react";
import init, { upiqrcode, type UpiqrcodeResult } from "upiqrcode";

function UPIQRCode() {
  const [qrSvg, setQrSvg] = useState("");
  const [intent, setIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateQR = async () => {
      setLoading(true);
      try {
        await init();

        const result = (await upiqrcode({
          payeeVPA: "pratyay2003@upi",
          payeeName: "pratyay mustafi",
          amount: "100.00",
          transactionNote: "Payment for services",
        })) as UpiqrcodeResult;

        setQrSvg(result.qr);
        setIntent(result.intent);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    generateQR();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>UPI Payment QR Code</h2>
      <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
      <p>UPI Intent: {intent}</p>
    </div>
  );
}


export default UPIQRCode;

```

## API

### `UpiqrcodeParams`

| Field                | Type     | Required | Description                        |
|----------------------|----------|----------|------------------------------------|
| `payeeVPA`           | `string` | ✅        | UPI Virtual Payment Address (VPA)  |
| `payeeName`          | `string` | ✅        | Name of the payee                  |
| `amount`             | `string` | —        | Transaction amount                 |
| `minimumAmount`      | `string` | —        | Minimum acceptable amount          |
| `currency`           | `string` | —        | Currency code (default: `INR`)     |
| `transactionId`      | `string` | —        | Unique transaction ID              |
| `transactionRef`     | `string` | —        | Transaction reference              |
| `transactionNote`    | `string` | —        | Note or description                |
| `payeeMerchantCode`  | `string` | —        | Merchant category code             |
| `transactionRefUrl`  | `string` | —        | Reference URL                      |

### `UpiqrcodeResult`

| Field    | Type     | Description              |
|----------|----------|--------------------------|
| `qr`     | `string` | SVG markup of the QR code |
| `intent` | `string` | Generated UPI intent URL  |

## React Example

```tsx
import { useState, useEffect } from "react";
import init, { upiqrcode, type UpiqrcodeResult } from "upiqrcode";

function UPIQRCode() {
  const [qrSvg, setQrSvg] = useState("");
  const [intent, setIntent] = useState("");

  useEffect(() => {
    (async () => {
      await init();
      const result = (await upiqrcode({
        payeeVPA: "example@upi",
        payeeName: "John Doe",
        amount: "100.00",
        transactionNote: "Payment for services",
      })) as UpiqrcodeResult;

      setQrSvg(result.qr);
      setIntent(result.intent);
    })();
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
      <p>Intent: {intent}</p>
    </div>
  );
}
```

## Building from Source

Requires [Rust](https://rustup.rs/) and [wasm-pack](https://rustwasm.github.io/wasm-pack/).

```bash
wasm-pack build --target bundler
```

## License

[Apache-2.0](./LICENSE_APACHE)
