/**
 * Settings Logic
 */

window.toggleTheme = function(checkbox) {
    if(!checkbox.checked) {
        showToast("Light mode is not fully implemented in this demo. Keeping dark mode.", "warning");
        setTimeout(() => {
            checkbox.checked = true;
        }, 1000);
    } else {
        showToast("Dark mode activated", "success");
    }
}

window.confirmLogout = function() {
    openModal('logoutModal');
}
