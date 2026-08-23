/**
 * Supabase Connection Configuration
 * 
 * Instructions:
 * 1. Go to your Supabase Dashboard (https://supabase.com/dashboard)
 * 2. Select your project -> Project Settings -> API
 * 3. Copy the "Project URL" and paste it into SUPABASE_URL
 * 4. Copy the "anon" "public" key and paste it into SUPABASE_ANON_KEY
 */

const SUPABASE_URL = 'https://jslatnacsucmwhkgqpkr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbGF0bmFjc3VjbXdoa2dxcGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNTQ5OTIsImV4cCI6MjEwMTgzMDk5Mn0.qIITexI7jtt8uEmTPRGOTWZY-gGRdLh9BcxVokTC3GI';


// Initialize the Supabase client
// Note: This relies on the Supabase JS SDK being loaded via CDN in the HTML files before this script.
let supabaseClient = null;

if (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized successfully.');
} else {
    console.warn('⚠️ Supabase not initialized. Please ensure the CDN script is loaded and keys are correct.');
}

/**
 * Basic Authentication Helpers (Optional to use)
 * You can call these functions from your other scripts once Supabase is connected.
 */

const Auth = {
    // Sign up a new user
    async signUp(email, password) {
        if (!supabaseClient) return { error: "Supabase not connected" };
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });
        return { data, error };
    },

    // Log in an existing user
    async signIn(email, password) {
        if (!supabaseClient) return { error: "Supabase not connected" };
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });
        return { data, error };
    },

    // Log out the current user
    async signOut() {
        if (!supabaseClient) return { error: "Supabase not connected" };
        const { error } = await supabaseClient.auth.signOut();
        return { error };
    },

    // Get the currently logged-in user
    async getUser() {
        if (!supabaseClient) return null;
        const { data: { user } } = await supabaseClient.auth.getUser();
        return user;
    }
};

// Export to global scope
window.Auth = Auth;
window.db = supabaseClient; // Expose db for database operations (e.g. window.db.from('users').select('*'))