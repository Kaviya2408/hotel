// Admin visibility control
// Add this script to any page that needs to show/hide admin features

(function() {
    'use strict';
    
    // Check if user is admin
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    
    // Show/hide admin features when DOM is ready
    function setupAdminVisibility() {
        // Show "Manage Menu" link in navigation
        const adminAddLink = document.getElementById('adminAddLink');
        if (adminAddLink) {
            adminAddLink.style.display = isAdmin ? 'inline' : 'none';
        }
        
        // Show "Admin Panel" in user dropdown
        const adminPanelLink = document.getElementById('adminPanelLink');
        if (adminPanelLink) {
            adminPanelLink.style.display = isAdmin ? 'flex' : 'none';
        }
        
        // Show any other elements with admin-only class
        const adminOnlyElements = document.querySelectorAll('.admin-only');
        adminOnlyElements.forEach(el => {
            el.style.display = isAdmin ? '' : 'none';
        });
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupAdminVisibility);
    } else {
        setupAdminVisibility();
    }
    
    // Expose to window for manual calls
    window.setupAdminVisibility = setupAdminVisibility;
})();
