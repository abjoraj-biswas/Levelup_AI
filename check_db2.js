const fs = require('fs');
const content = fs.readFileSync('js/supabase-config.js', 'utf8');
const urlMatch = content.match(/const SUPABASE_URL = '([^']+)'/);
const keyMatch = content.match(/const SUPABASE_ANON_KEY = '([^']+)'/);

const supabaseUrl = urlMatch[1];
const supabaseKey = keyMatch[1];

async function check() {
    console.log("Checking mockInterviews...");
    const res1 = await fetch(`${supabaseUrl}/rest/v1/mockInterviews?select=*`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const data1 = await res1.json();
    console.log("mockInterviews data:", data1);
    
    console.log("Checking interview_questions...");
    const res2 = await fetch(`${supabaseUrl}/rest/v1/interview_questions?select=*`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const data2 = await res2.json();
    console.log("interview_questions data:", data2);
    
    console.log("Checking interview_attempts schema (inserting test)...");
    // Just try to fetch a row to see if the table is readable
    const res3 = await fetch(`${supabaseUrl}/rest/v1/interview_attempts?select=*&limit=1`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    console.log("interview_attempts status:", res3.status, await res3.text());
}

check();
