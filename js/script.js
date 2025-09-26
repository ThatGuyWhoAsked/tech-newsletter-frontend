const API_BASE = 'https://tech-newsletter-backend-10benoyub-rithwiks-projects-a4a1ebbd.vercel.app'; // Production backend URL; use 'http://localhost:3000' for local development
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const icon = toggle.querySelector('i');
    const span = toggle.querySelector('span');

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateToggle(currentTheme);

    toggle.addEventListener('click', function() {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggle(newTheme);
    });

    function updateToggle(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            span.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            span.textContent = 'Dark Mode';
        }
    }

    // Handle subscription forms
    const forms = document.querySelectorAll('.subscription-form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/api/subscribe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    this.reset();
                } else {
                    alert(data.error || data.message || 'Subscription failed. Please try again.');
                }
            } catch (error) {
                console.error('Subscription error:', error);
                alert('Error submitting subscription. Ensure the backend server is running on port 3000.');
            }
        });
    });
});