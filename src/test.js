// Simple test to verify the upiqrcode functionality
const upiqrcode = require('../lib/index');

async function runTests() {
    console.log('Running upiqrcode tests...');
    
    try {
        // Test 1: Basic functionality
        const result = await upiqrcode.default({
            payeeVPA: "test@paytm",
            payeeName: "Test User"
        });
        
        if (!result.qr || !result.intent) {
            throw new Error('Missing qr or intent in result');
        }
        
        if (!result.qr.startsWith('data:image/png;base64,')) {
            throw new Error('QR code should be a base64 PNG data URL');
        }
        
        if (!result.intent.startsWith('upi://pay?')) {
            throw new Error('Intent should start with upi://pay?');
        }
        
        console.log('✓ Basic functionality test passed');
        
        // Test 2: Validation test
        try {
            await upiqrcode.default({
                payeeVPA: "a", // Too short
                payeeName: "Test User"
            });
            throw new Error('Should have failed validation');
        } catch (err) {
            if (err.message.includes('too short')) {
                console.log('✓ Validation test passed');
            } else {
                throw err;
            }
        }
        
        // Test 3: Missing required fields
        try {
            await upiqrcode.default({
                payeeVPA: "test@paytm"
                // Missing payeeName
            });
            throw new Error('Should have failed validation');
        } catch (err) {
            if (err.message.includes('compulsory')) {
                console.log('✓ Required fields test passed');
            } else {
                throw err;
            }
        }
        
        console.log('All tests passed! ✨');
        process.exit(0);
        
    } catch (error) {
        console.error('Test failed:', error.message);
        process.exit(1);
    }
}

runTests();
