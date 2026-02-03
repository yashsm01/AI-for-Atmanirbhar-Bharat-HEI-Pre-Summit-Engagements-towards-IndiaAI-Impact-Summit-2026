require('dotenv').config();

const apiKey = process.env.GOOGLE_API_KEY;
console.log('\n=== Gemini API Key Test ===\n');
console.log('API Key:', apiKey ? `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : 'NOT FOUND');

if (!apiKey) {
    console.log('\n❌ No API key found in .env file!');
    console.log('Please add: GOOGLE_API_KEY=your_key_here');
    process.exit(1);
}

async function testAPI() {
    console.log('\nTesting API connection...\n');

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        if (!response.ok) {
            const error = await response.json();
            console.log('❌ API Error:', error.error?.message || response.statusText);
            console.log('\n💡 Get a new API key at: https://aistudio.google.com/apikey');
            return;
        }

        const data = await response.json();
        console.log('✅ API Key is valid!\n');
        console.log('Available models:');
        data.models?.forEach(m => {
            if (m.name.includes('gemini')) {
                console.log(`  - ${m.name.replace('models/', '')}`);
            }
        });

    } catch (err) {
        console.log('❌ Connection Error:', err.message);
    }
}

testAPI();
