const SUPABASE_URL = 'https://jslatnacsucmwhkgqpkr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbGF0bmFjc3VjbXdoa2dxcGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNTQ5OTIsImV4cCI6MjEwMTgzMDk5Mn0.qIITexI7jtt8uEmTPRGOTWZY-gGRdLh9BcxVokTC3GI';

async function fetchSchema() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`);
        
        const data = await response.json();
        
        const targetTables = ['mockInterviews', 'interview_attempts', 'interview_questions', 'interview_answers', 'interview_feedback'];
        
        if (data.definitions) {
            for (const table of targetTables) {
                if (data.definitions[table]) {
                    console.log(`\n=== Table: ${table} ===`);
                    const props = data.definitions[table].properties;
                    for (const [col, desc] of Object.entries(props)) {
                        console.log(`- ${col}: ${desc.type || desc.format}`);
                    }
                } else {
                    console.log(`\nTable ${table} not found in OpenAPI spec.`);
                }
            }
        } else {
            console.log("No definitions found. Keys:", Object.keys(data));
        }
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

fetchSchema();
