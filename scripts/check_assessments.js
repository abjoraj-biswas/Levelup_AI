const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://jslatnacsucmwhkgqpkr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbGF0bmFjc3VjbXdoa2dxcGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNTQ5OTIsImV4cCI6MjEwMTgzMDk5Mn0.qIITexI7jtt8uEmTPRGOTWZY-gGRdLh9BcxVokTC3GI';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkAssessments() {
    console.log("Fetching assessments...");
    const { data: assessData, error: assessErr } = await supabase.from('assessments').select('*');
    if (assessErr) {
        console.error("Error fetching assessments:", assessErr);
    } else {
        console.log(`Found ${assessData.length} assessments.`);
        console.log(assessData);
    }
    
    console.log("\nFetching assessment questions...");
    const { data: qData, error: qErr } = await supabase.from('assessment_questions').select('*').limit(5);
    if (qErr) {
        console.error("Error fetching questions:", qErr);
    } else {
        console.log(`Found ${qData.length} questions (showing first 5).`);
        console.log(qData);
    }
}
checkAssessments();
