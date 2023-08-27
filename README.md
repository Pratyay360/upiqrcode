# Upiqrcode
[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]
Generate NPCI's UPI QR code (BASE64) along with UPI intent link, By using it any payment is possible from UPI enabled apps.

## Supports

<div id="header" align="center">
  <img src="https://raw.githubusercontent.com/bhar4t/bhar4t/master/public/img/upis.png" width="300"/>
</div>

<br/>

This package will work on client and server.

```js

  import upiqrcode  from "upiqrcode";

  upiqr({
    payeeVPA: "pratyaymustafi@paytm",
    payeeName: "Pratyay Mustafi"
  })
  .then((upi) => {
    console.log(upi.qr);      // data:image/png;base64,eR0lGODP...
    console.log(upi.intent);  // upi://pay?pa=Pratyaymustafi@paytm&pn=Pratyay..
  })
  .catch(err => {
    console.log(err);
  });


```

### Fields detail:

| Fields            | Description                                       | Required  |
|-------------------|---------------------------------------------------|-----------|
| payeeVPA          | VPA address from UPI payment account              | Mandatory |
| payeeName         | Merchant Name registered in UPI payment account   | Mandatory |
| payeeMerchantCode | Merchant Code from UPI payment account            | Optional  |
| transactionId     | Unique transaction id for merchant's reference    | Optional  |
| transactionRef    | Unique transaction id for merchant's reference    | Optional  |
| transactionNote   | Note will appear in payment app while transaction | Optional  |
| amount            | Amount                                            | Optional  |
| minimumAmount     | Minimum amount that has to be transferred         | Optional  |
| currency          | Currency of amount (default: INR)                 | Optional  |
| transactionRefUrl | URL for the order                                 | Optional  |


In table, fields requirement column is based on static QR, For dynamic QR you need to change more fields along with `payeeVPA` and `payeeName`.

For a complete list of supported fields, refer to the [NPCI UPI Linking Specs](https://www.npci.org.in/PDF/npci/upi/circular/2017/Circular18_BankCompliances_to_enbaleUPIMerchantecosystem_0.pdf)

Internally using `@types/qrcode` for QR Generation.


[downloads-img]:https://img.shields.io/npm/dt/upiqrcode
[downloads-url]:https://www.npmtrends.com/upiqrcode
[npm-img]:https://img.shields.io/npm/v/upiqrcode
[npm-url]:https://www.npmjs.com/package/upiqrcode
[issues-img]:https://img.shields.io/github/issues/Pratyay360/upiqrcode
[issues-url]:https://github.com/Pratyay360/upiqrcode/issues
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/Pratyay360/upiqrcode
##### This project is a modification of [bhar4t/upiqr](https://github.com/bhar4t/upiqr)
