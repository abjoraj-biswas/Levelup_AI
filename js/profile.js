/**
 * Profile Logic
 */

document.addEventListener('AppDataLoaded', () => {
    initProfile();
});

function initProfile() {
    populateProfileData();
}

function populateProfileData() {
    const user = AppState.getUser();
    if (!user) return;

    // Header updates
    document.getElementById('profileAvatar').textContent = user.name.charAt(0).toUpperCase();
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileSubtext').textContent = `${user.branch} • ${user.college}`;

    // Stats updates
    document.getElementById('statSkills').textContent = user.totalSkillsLearning ?? '-';
    document.getElementById('statCompleted').textContent = user.completedSkills ?? '-';
    document.getElementById('statHours').textContent = user.learningHours ?? '-';
    document.getElementById('statStreak').textContent = `${user.streak ?? '-'} Days`;

    // Form updates
    document.getElementById('inputName').value = user.name;
    document.getElementById('inputEmail').value = user.email;
    document.getElementById('inputCollege').value = user.college;
    document.getElementById('inputBranch').value = user.branch;
    document.getElementById('inputDob').value = user.dob;
}

window.toggleEditMode = function(isEditing) {
    const inputs = document.querySelectorAll('#profileForm input');
    
    inputs.forEach(input => {
        if(isEditing) {
            input.removeAttribute('readonly');
            input.style.background = 'rgba(255,255,255,0.05)';
        } else {
            input.setAttribute('readonly', true);
            input.style.background = 'rgba(0,0,0,0.3)';
            // Reset values
            populateProfileData();
        }
    });

    if(isEditing) {
        document.getElementById('actionButtons').classList.add('hidden');
        document.getElementById('editButtons').classList.remove('hidden');
        document.getElementById('inputName').focus();
    } else {
        document.getElementById('actionButtons').classList.remove('hidden');
        document.getElementById('editButtons').classList.add('hidden');
    }
}

window.saveProfile = function(event) {
    event.preventDefault();
    
    const user = AppState.getUser();
    
    user.name = document.getElementById('inputName').value;
    user.email = document.getElementById('inputEmail').value;
    user.college = document.getElementById('inputCollege').value;
    user.branch = document.getElementById('inputBranch').value;
    user.dob = document.getElementById('inputDob').value;
    
    AppState.setUser(user);
    
    populateProfileData();
    updateGlobalUI();
    
    toggleEditMode(false);
    showToast("Profile updated successfully", "success");
}
