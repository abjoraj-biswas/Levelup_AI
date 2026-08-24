const fs = require('fs');
const content = fs.readFileSync('js/supabase-config.js', 'utf8');
const urlMatch = content.match(/const SUPABASE_URL = '([^']+)'/);
const keyMatch = content.match(/const SUPABASE_ANON_KEY = '([^']+)'/);

const supabaseUrl = urlMatch[1];
const supabaseKey = keyMatch[1];

async function check() {
    const res1 = await fetch(`${supabaseUrl}/rest/v1/assessment_questions?select=difficulty`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const data1 = await res1.json();
    const uniqueDiffs = [...new Set(data1.map(d => d.difficulty))];
    console.log("Difficulties:", uniqueDiffs);
    
    const res2 = await fetch(`${supabaseUrl}/rest/v1/assessment_questions?select=assessment_name`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const data2 = await res2.json();
    const uniqueAs = [...new Set(data2.map(d => d.assessment_name))];
    console.log("Assessments:", uniqueAs);
}

check();
