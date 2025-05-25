// Example usage of upiqrcode package
const upiqrcode = require('../lib/index');

async function example() {
    console.log('🚀 upiqrcode Example\n');

    try {
        // Basic UPI QR Code generation
        console.log('1. Generating basic UPI QR code...');
        const basicResult = await upiqrcode.default({
            payeeVPA: "example@paytm",
            payeeName: "Example Merchant"
        });

        console.log('✓ QR Code generated successfully');
        console.log('Intent URL:', basicResult.intent);
        console.log('QR Code length:', basicResult.qr.length, 'characters\n');

        // Advanced UPI QR Code with amount and note
        console.log('2. Generating UPI QR code with amount...');
        const advancedResult = await upiqrcode.default({
            payeeVPA: "shop@upi",
            payeeName: "Coffee Shop",
            amount: "150.00",
            currency: "INR",
            transactionNote: "Coffee and snacks",
            transactionId: "TXN" + Date.now()
        });

        console.log('✓ Advanced QR Code generated successfully');
        console.log('Intent URL:', advancedResult.intent);
        console.log('QR Code length:', advancedResult.qr.length, 'characters\n');

        console.log('🎉 All examples completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the example
example();
