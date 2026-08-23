/**
 * Navigation & Sidebar Logic
 */

document.addEventListener('AppDataLoaded', () => {
    // 1. Handle Active Link Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 2. Mobile Sidebar Toggle
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (hamburgerBtn && sidebar) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !hamburgerBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // 3. Profile Dropdown
    const profileMenu = document.querySelector('.user-profile-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu.profile-dropdown');
    
    if (profileMenu && dropdownMenu) {
        profileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
            
            // Close notification dropdown if open
            const notifDropdown = document.querySelector('.dropdown-menu.notif-dropdown');
            if(notifDropdown) notifDropdown.classList.remove('active');
        });
    }

    // 4. Notification Dropdown
    const notifBell = document.querySelector('.notification-bell');
    const notifDropdown = document.querySelector('.dropdown-menu.notif-dropdown');
    
    if (notifBell && notifDropdown) {
        notifBell.addEventListener('click', (e) => {
            e.stopPropagation();
            renderNotifications();
            notifDropdown.classList.toggle('active');
            
            // Close profile dropdown if open
            if(dropdownMenu) dropdownMenu.classList.remove('active');
        });
    }

    // Close all dropdowns when clicking outside
    document.addEventListener('click', () => {
        if(dropdownMenu) dropdownMenu.classList.remove('active');
        if(notifDropdown) notifDropdown.classList.remove('active');
    });

    // 5. Global Search setup
    const searchInput = document.querySelector('.search-bar input');
    if(searchInput) {
        searchInput.addEventListener('keypress', window.handleGlobalSearch);
    }
});

// Render Notifications in Dropdown
function renderNotifications() {
    const notifList = document.querySelector('.notification-list');
    if(!notifList) return;
    
    const notifs = AppState.getNotifications();
    notifList.innerHTML = '';
    
    if(notifs.length === 0) {
        notifList.innerHTML = '<div style="padding:15px;text-align:center;color:var(--text-muted)">No notifications</div>';
        return;
    }
    
    notifs.forEach(notif => {
        const item = document.createElement('div');
        item.className = `notif-item ${notif.read ? 'read' : 'unread'}`;
        item.innerHTML = `
            <div class="notif-icon ${notif.type}"><i class="${notif.icon}"></i></div>
            <div class="notif-content">
                <strong>${notif.title}</strong>
                <p>${notif.message}</p>
            </div>
            ${!notif.read ? `<button onclick="markRead(${notif.id}, event)" title="Mark as read" class="mark-read-btn"><i class="fa-solid fa-check"></i></button>` : ''}
        `;
        notifList.appendChild(item);
    });
}

window.markRead = function(id, event) {
    event.stopPropagation();
    AppState.markNotificationRead(id);
    renderNotifications();
    showToast("Notification marked as read");
}

window.markAllRead = function(event) {
    event.stopPropagation();
    AppState.markAllNotificationsRead();
    renderNotifications();
    showToast("All notifications marked as read");
}
