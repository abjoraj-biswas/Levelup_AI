// auth-guard.js
// Protects pages by ensuring the user is logged in via Supabase Auth

document.addEventListener('DOMContentLoaded', async () => {
    if (!window.db) {
        console.error("Supabase client not initialized.");
        return;
    }

    const { data: { session }, error } = await window.db.auth.getSession();

    if (error || !session) {
        console.log("No active session, redirecting to login.");
        window.location.href = 'login.html';
        return;
    }

    // Set the global user variable for UI
    window.currentUser = session.user;

    // Listen for auth changes
    window.db.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
            window.location.href = 'login.html';
        }
    });
});
