document.addEventListener('DOMContentLoaded', function () {
    // Modal Functionality
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const openBtns = document.querySelectorAll('.open-model');
    const bookingForm = document.getElementById('bookingForm');

    // Set default title and desc variables
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    // Open Modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            const info = btn.getAttribute('data-info');

            modalTitle.textContent = `Book ${type}`;
            modalDesc.textContent = `You are booking: ${info}. Please enter your details below.`;

            modal.style.display = 'flex';
        });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        bookingForm.reset();
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            bookingForm.reset();
        }
    });

    // Handle Form Submit
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success / loading state (simulated)
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Booking confirmed! We will send you a confirmation email shortly.');
            modal.style.display = 'none';
            bookingForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Search Bar Animation/Interaction (Simple Shake on empty search)
    const searchBtn = document.querySelector('.search-btn');
    const searchInputs = document.querySelectorAll('.search-input input, .search-input select');

    searchBtn.addEventListener('click', () => {
        let filled = true;
        searchInputs.forEach(input => {
            if (!input.value) {
                filled = false;
                input.parentElement.style.border = '1px solid #e71d36';
            } else {
                input.parentElement.style.border = '1px solid #eee';
            }
        });

        if (!filled) {
            alert('Please fill in all fields to search.');
        } else {
            // Simulated search scroll to packages
            document.getElementById('flights').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Animate Card entrance on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.booking-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        cardObserver.observe(card);
    });
});
