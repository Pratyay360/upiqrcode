# upiqrcode

Generate UPI QR codes as SVG .. 

for documentation kindly visit [docs](https://dynamic-upi-qr.netlify.app/)
[![](https://data.jsdelivr.com/v1/package/npm/upiqrcode/badge)](https://www.jsdelivr.com/package/npm/upiqrcode)aas

[![npm](https://img.shields.io/npm/v/upiqrcode)](https://www.npmjs.com/package/upiqrcode)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE_APACHE)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Pratyay360/upiqrcode)


[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=for-the-badge&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/Pratyay360/upiqrcode)
## Installation

```bash
npm install upiqrcode
```

## Usage

### `upiqrcode(params)` → `Promise<UpiqrcodeResult>`

Generates a UPI payment QR code as an SVG string along with the UPI intent URL.

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


## Building from Source

Requires [Rust](https://rustup.rs/) and [wasm-pack](https://rustwasm.github.io/wasm-pack/).

```bash
wasm-pack build --target bundler
```

## License

[Apache-2.0](./LICENSE_APACHE)
