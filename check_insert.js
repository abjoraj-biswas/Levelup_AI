const fs = require('fs');
const content = fs.readFileSync('js/supabase-config.js', 'utf8');
const urlMatch = content.match(/const SUPABASE_URL = '([^']+)'/);
const keyMatch = content.match(/const SUPABASE_ANON_KEY = '([^']+)'/);

const supabaseUrl = urlMatch[1];
const supabaseKey = keyMatch[1];

async function check() {
    const res = await fetch(`${supabaseUrl}/rest/v1/interview_attempts?limit=1`, {
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=representation'
        }
    });
    
    // Instead of doing information_schema which might be blocked, we can POST an invalid row and read the error message.
    const resInsert = await fetch(`${supabaseUrl}/rest/v1/interview_attempts`, {
        method: 'POST',
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            interview_id: "mi1",
            user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            status: "in_progress"
        })
    });
    
    console.log("Insert Error:", await resInsert.text());
}

check();
