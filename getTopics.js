const SUPABASE_URL = 'https://jslatnacsucmwhkgqpkr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbGF0bmFjc3VjbXdoa2dxcGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNTQ5OTIsImV4cCI6MjEwMTgzMDk5Mn0.qIITexI7jtt8uEmTPRGOTWZY-gGRdLh9BcxVokTC3GI';

async function run() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/assessment_questions?select=assessment_name`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    const data = await res.json();
    if(data.error || data.code) {
        console.error(data);
    } else {
        const unique = [...new Set(data.map(d => d.assessment_name))];
        console.log("TOPICS:", unique);
    }
}
run();
