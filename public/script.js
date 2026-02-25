// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Update auth buttons after page load
    updateAuthButtons();
});

// Update authentication buttons based on login state
function updateAuthButtons() {
    const authButtons = document.getElementById('authButtons');
    if (!authButtons) return;
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn && userEmail) {
        const isAdmin = userEmail === 'kit27.csbs29@gmail.com';
        
        authButtons.innerHTML = `
            <div class="user-menu">
                <button class="user-btn" id="userMenuBtn">
                    <i class="fas fa-user-circle"></i>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
                    ${isAdmin ? '<a href="admin.html"><i class="fas fa-shield-alt"></i> Admin Panel</a>' : ''}
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;
        
        // Add dropdown toggle functionality
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            userDropdown.classList.remove('show');
        });
        
        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    } else {
        authButtons.innerHTML = '<a href="login.html" class="btn-outline">Login</a>';
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-wrapper')) {
        navMenu?.classList.remove('active');
        menuToggle?.classList.remove('active');
    }
});

// Update cart count from localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
    }
}

// Initialize cart count on page load
updateCartCount();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart functionality (basic)
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const dishCard = this.closest('.dish-card');
        const dishName = dishCard.querySelector('h3').textContent;
        const dishPrice = dishCard.querySelector('.price').textContent;
        
        // Get existing cart or create new one
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if item already exists
        const existingItem = cart.find(item => item.name === dishName);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                name: dishName,
                price: dishPrice,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Visual feedback
        this.textContent = 'Added!';
        this.style.background = '#7cb342';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '';
        }, 1500);
    });
});

// Table Booking Modal
const bookTableBtn = document.getElementById('bookTableBtn');
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

if (bookTableBtn) {
    bookTableBtn.addEventListener('click', () => {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today
        const dateInput = document.getElementById('bookingDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Handle booking form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('bookingName').value,
            phone: document.getElementById('bookingPhone').value,
            guests: document.getElementById('bookingGuests').value,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            email: document.getElementById('bookingEmail').value,
            notes: document.getElementById('bookingNotes').value,
            timestamp: new Date().toISOString()
        };
        
        // Get existing bookings or create new array
        let bookings = JSON.parse(localStorage.getItem('tableBookings')) || [];
        bookings.push(formData);
        localStorage.setItem('tableBookings', JSON.stringify(bookings));
        
        // Show success message
        alert(`Table booked successfully!\n\nName: ${formData.name}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}\n\nWe'll contact you at ${formData.phone} to confirm your reservation.`);
        
        // Reset form and close modal
        bookingForm.reset();
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}
