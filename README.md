# 🚀 UPI QR Code Generator

[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![TypeScript][typescript-img]][typescript-url]
[![License: GPL v3][license-img]][license-url]

> **A robust, TypeScript-ready library for generating NPCI-compliant UPI QR codes with intent URLs**

Generate UPI QR codes (BASE64) along with UPI intent links for seamless payments through any UPI-enabled app. Perfect for merchants, developers, and payment integrations.

## 📋 Table of Contents

- [🚀 UPI QR Code Generator](#-upi-qr-code-generator)
  - [📋 Table of Contents](#-table-of-contents)
  - [⚠️ Important Disclaimer](#️-important-disclaimer)
  - [✨ Features](#-features)
  - [📋 Requirements](#-requirements)
  - [📦 Installation](#-installation)
  - [🚀 Quick Start](#-quick-start)
  - [💡 Advanced Usage](#-advanced-usage)
    - [Payment with Amount](#payment-with-amount)
    - [Dynamic QR for Different Amounts](#dynamic-qr-for-different-amounts)
  - [📖 API Reference](#-api-reference)
    - [`upiqrcode(params: UpiqrcodeParams): Promise<UpiqrcodeResult>`](#upiqrcodeparams-upiqrcodeparams-promiseupiqrcoderesult)
      - [Parameters](#parameters)
      - [Returns](#returns)
      - [Example Response](#example-response)
  - [🎯 Supported UPI Apps](#-supported-upi-apps)
  - [🛠️ Development](#️-development)
    - [Running Examples](#running-examples)
    - [Project Scripts](#project-scripts)
  - [🔧 Error Handling](#-error-handling)
    - [Common Errors](#common-errors)
  - [📱 Frontend Integration](#-frontend-integration)
    - [React Example](#react-example)
    - [HTML/Vanilla JS](#htmlvanilla-js)
  - [🔐 Security \& Compliance](#-security--compliance)
    - [🛡️ Security Features](#️-security-features)
    - [⚖️ Compliance Notes](#️-compliance-notes)
  - [❓ Frequently Asked Questions](#-frequently-asked-questions)
    - [Is this library safe to use?](#is-this-library-safe-to-use)
    - [Can I use this for commercial projects?](#can-i-use-this-for-commercial-projects)
    - [Does this work with all UPI apps?](#does-this-work-with-all-upi-apps)
    - [Do I need NPCI approval to use this?](#do-i-need-npci-approval-to-use-this)
    - [How accurate are the generated QR codes?](#how-accurate-are-the-generated-qr-codes)
  - [📚 Resources](#-resources)
  - [🤝 Contributing](#-contributing)
    - [📝 Contribution Guidelines](#-contribution-guidelines)
    - [Development Setup](#development-setup)
  - [📄 License](#-license)
  - [👨‍💻 Author](#-author)
  - [💖 Support](#-support)
    - [📊 Project Stats](#-project-stats)

## ⚠️ Important Disclaimer

> **🚨 PERSONAL PROJECT NOTICE**
>
> This is a **personal open-source project** and is **NOT officially associated with**:
> - 🏛️ **National Payments Corporation of India (NPCI)**
> - 🏦 **Any financial institutions or banks**
> - 💳 **UPI service providers**
> - 🏢 **Any government organizations**
>
> This library follows publicly available UPI specifications for educational and development purposes. Users are responsible for compliance with applicable regulations and should conduct proper testing before production use.

## ✨ Features

- 🎯 **NPCI Compliant** - Follows official UPI linking specifications
- 📱 **Universal Support** - Works with all major UPI apps (PhonePe, GPay, Paytm, etc.)
- 🔧 **TypeScript Ready** - Full type definitions included
- 🌐 **Cross-Platform** - Works in Node.js and browser environments
- ⚡ **Fast & Lightweight** - Minimal dependencies, maximum performance (~50KB)
- 🔒 **Secure** - No external API calls, everything processed locally
- ✅ **Well Tested** - Comprehensive test suite included
- 📖 **Great Documentation** - Detailed examples and API reference
- 🔄 **Promise-based** - Modern async/await support
- 🛠️ **Developer Friendly** - Easy integration with existing projects

## 📋 Requirements

- **Node.js:** 18.0.0 or later
- **Package Manager:** pnpm (recommended), npm, yarn, or bun

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add upiqrcode

# Using bun
bun add upiqrcode

# Using npm
npm install upiqrcode

# Using yarn
yarn add upiqrcode
```

## 🚀 Quick Start

```typescript
import upiqrcode from "upiqrcode";

// Basic UPI QR code generation
const upiData = await upiqrcode({
  payeeVPA: "merchant@upi",
  payeeName: "Your Store Name"
});

console.log(upiData.qr);      // Base64 PNG image: data:image/png;base64,iVBOR...
console.log(upiData.intent);  // UPI intent: upi://pay?pa=merchant@upi&pn=Your%20Store%20Name
```

## 💡 Advanced Usage

### Payment with Amount

```typescript
import upiqrcode from "upiqrcode";

const paymentQR = await upiqrcode({
  payeeVPA: "shop@paytm",
  payeeName: "Coffee Shop",
  amount: "299.00",
  currency: "INR",
  transactionNote: "Cappuccino and pastry",
  transactionId: "ORDER_" + Date.now()
});

// Use the QR code in your app
document.getElementById('qr-image').src = paymentQR.qr;
```

### Dynamic QR for Different Amounts

```typescript
import upiqrcode from "upiqrcode";

const createPaymentQR = async (amount: string, note: string) => {
  return await upiqrcode({
    payeeVPA: "business@upi",
    payeeName: "My Business",
    amount: amount,
    currency: "INR",
    transactionNote: note,
    transactionId: `TXN_${Date.now()}`,
    minimumAmount: amount // Ensure exact amount
  });
};

// Generate QR for ₹150
const qr150 = await createPaymentQR("150.00", "Product purchase");
```

## 📖 API Reference

### `upiqrcode(params: UpiqrcodeParams): Promise<UpiqrcodeResult>`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payeeVPA` | `string` | ✅ **Yes** | UPI Virtual Payment Address (e.g., `merchant@paytm`) |
| `payeeName` | `string` | ✅ **Yes** | Merchant/Payee name (min 4 chars) |
| `amount` | `string` | ❌ No | Payment amount in decimal format (e.g., `"299.50"`) |
| `currency` | `string` | ❌ No | Currency code (default: `"INR"`) |
| `transactionNote` | `string` | ❌ No | Payment description/note |
| `transactionId` | `string` | ❌ No | Unique transaction identifier |
| `transactionRef` | `string` | ❌ No | Alternative transaction reference |
| `minimumAmount` | `string` | ❌ No | Minimum amount to be paid |
| `payeeMerchantCode` | `string` | ❌ No | Merchant category code |
| `transactionRefUrl` | `string` | ❌ No | Reference URL for the transaction |

#### Returns

```typescript
interface UpiqrcodeResult {
  qr: string;      // Base64 encoded PNG image with data URI
  intent: string;  // UPI intent URL for app integration
}
```

#### Example Response

```typescript
{
  qr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  intent: "upi://pay?pa=merchant@upi&pn=Store%20Name&am=100.00&cu=INR"
}
```


## 🎯 Supported UPI Apps

<div align="center">
  <img src="https://raw.githubusercontent.com/bhar4t/bhar4t/master/public/img/upis.png" width="400" alt="Supported UPI Apps"/>
  <p><em>Works with all major UPI-enabled applications</em></p>
</div>

## 🛠️ Development

### Running Examples

```bash
# Clone the repository
git clone https://github.com/Pratyay360/upiqrcode.git
cd upiqrcode

# Install dependencies
pnpm install

# Run the example
pnpm run example

# Run tests
pnpm test

# Build the project
pnpm run build
```

### Project Scripts

| Script | Description |
|--------|-------------|
| `pnpm run build` | Compile TypeScript to JavaScript |
| `pnpm test` | Run the test suite |
| `pnpm run example` | Execute usage examples |

## 🔧 Error Handling

```typescript
import upiqrcode from "upiqrcode";

try {
  const result = await upiqrcode({
    payeeVPA: "invalid", // Too short
    payeeName: "Test"
  });
} catch (error) {
  console.error("QR Generation failed:", error.message);
  // Handle validation errors gracefully
}
```

### Common Errors

- **Validation Error**: VPA or payee name too short/missing
- **Generation Error**: QR code creation failed (rare)

## 📱 Frontend Integration

### React Example

```tsx
import React, { useState } from 'react';
import upiqrcode from 'upiqrcode';

const PaymentQR: React.FC = () => {
  const [qrCode, setQrCode] = useState<string>('');

  const generateQR = async () => {
    try {
      const result = await upiqrcode({
        payeeVPA: 'store@upi',
        payeeName: 'My Store',
        amount: '500.00'
      });
      setQrCode(result.qr);
    } catch (error) {
      console.error('Failed to generate QR:', error);
    }
  };

  return (
    <div>
      <button onClick={generateQR}>Generate Payment QR</button>
      {qrCode && <img src={qrCode} alt="UPI QR Code" />}
    </div>
  );
};
```

### HTML/Vanilla JS

```html
<script type="module">
import upiqrcode from 'https://unpkg.com/upiqrcode@latest/lib/index.js';

const result = await upiqrcode({
  payeeVPA: 'merchant@upi',
  payeeName: 'Online Store'
});

document.getElementById('qr-image').src = result.qr;
</script>
```

## 🔐 Security & Compliance

### 🛡️ Security Features
- **Local Processing**: All QR code generation happens locally - no data sent to external servers
- **No API Dependencies**: Works completely offline after installation
- **Input Validation**: Built-in validation for UPI parameters
- **Type Safety**: Full TypeScript support prevents common errors

### ⚖️ Compliance Notes
- Follows publicly available UPI linking specifications
- Users must ensure compliance with local financial regulations
- Recommended for development, testing, and educational purposes
- Production use requires proper validation and testing
- Consider consulting with financial compliance experts for commercial implementations

## ❓ Frequently Asked Questions

### Is this library safe to use?
Yes, the library processes everything locally and doesn't send data to external servers. However, ensure you validate all inputs and test thoroughly before production use.

### Can I use this for commercial projects?
This is an open-source library under GPL v3 license. You can use it for commercial projects, but you must comply with the license terms and ensure regulatory compliance.

### Does this work with all UPI apps?
Yes, the generated QR codes follow standard UPI specifications and work with all major UPI-enabled applications like PhonePe, Google Pay, Paytm, etc.

### Do I need NPCI approval to use this?
This library generates standard UPI QR codes based on publicly available specifications. For commercial payment processing, consult with your legal and compliance teams.

### How accurate are the generated QR codes?
The library follows NPCI's publicly available UPI linking specifications. However, always test with your target UPI apps before production deployment.

## 📚 Resources

- 📖 **[NPCI UPI Linking Specs](https://www.npci.org.in/PDF/npci/upi/circular/2017/Circular18_BankCompliances_to_enbaleUPIMerchantecosystem_0.pdf)** - Official UPI documentation
- 📝 **[Usage Blog Post](https://pratyaywrites.hashnode.dev/use-upiqrcode)** - Detailed tutorial by the author
- 💻 **[Examples Directory](examples/)** - Additional code examples
- 🐛 **[Report Issues](https://github.com/Pratyay360/upiqrcode/issues)** - Bug reports and feature requests

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### 📝 Contribution Guidelines

- Ensure all changes maintain the educational and open-source nature of this project
- Add tests for new features
- Update documentation as needed
- Follow existing code style and conventions

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/upiqrcode.git`
3. Install dependencies: `pnpm install`
4. Make your changes
5. Run tests: `pnpm test`
6. Build the project: `pnpm run build`
7. Create a Pull Request

## 📄 License

This project is licensed under the **GPL v3** License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pratyay Mitra Mustafi**
- Website: [pratyay.vercel.app](https://pratyay.vercel.app/)
- Email: pratyaymustafi@outlook.com
- GitHub: [@Pratyay360](https://github.com/Pratyay360)

## 💖 Support

If this project helped you, please consider:
- ⭐ **Starring the repository** on GitHub
- 🐛 **Reporting bugs** and issues
- 💡 **Suggesting new features**
- 📝 **Contributing** to the codebase
- 📢 **Sharing** with others who might find it useful

### 📊 Project Stats
- 📦 **Bundle Size**: ~50KB minified
- 🧪 **Test Coverage**: Comprehensive test suite
- 📈 **Performance**: Generates QR codes in ~50ms (Node.js)
- 🔧 **Dependencies**: Minimal footprint with only essential deps

---

<div align="center">
  
  **⚠️ DISCLAIMER: This is a personal open-source project**
  
  **NOT affiliated with NPCI, banks, or financial institutions**
  
  ---
  
  <strong>Made with ❤️ for the developer community</strong>
  
  <sub>Use responsibly • Test thoroughly • Follow regulations</sub>
  
</div>

<!-- Badge definitions -->
[downloads-img]: https://img.shields.io/npm/dt/upiqrcode
[downloads-url]: https://www.npmtrends.com/upiqrcode
[npm-img]: https://img.shields.io/npm/v/upiqrcode
[npm-url]: https://www.npmjs.com/package/upiqrcode
[issues-img]: https://img.shields.io/github/issues/Pratyay360/upiqrcode
[issues-url]: https://github.com/Pratyay360/upiqrcode/issues
[typescript-img]: https://img.shields.io/badge/TypeScript-Ready-blue.svg
[typescript-url]: https://www.typescriptlang.org/
[license-img]: https://img.shields.io/badge/License-GPL%20v3-blue.svg
[license-url]: https://www.gnu.org/licenses/gpl-3.0
