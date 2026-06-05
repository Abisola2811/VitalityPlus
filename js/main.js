/* -------------------------------------------------------------
   VITALITYPLUS - WEBSITE ACTIONS & INTERACTIONS
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PAGE INITS & SMOOTH FADE-IN
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.classList.add('page-fade-in');
  }

  // 2. ACTIVE NAVIGATION PATH DETECTION
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    // Check if the link's href matches the current page filename
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) || 
        (currentPath.endsWith('/') && href === 'index.html') ||
        (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 3. STICKY HEADER SCROLL EFFECT
  const header = document.querySelector('.header-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. MOBILE HAMBURGER MENU TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Update hamburger icon lines visually if toggle state changes
      const isOpen = navMenu.classList.contains('active');
      mobileToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`;
      }
    });
  }

  // 5. DOCTORS PAGE FILTERING SYSTEM
  const filterButtons = document.querySelectorAll('.filter-btn');
  const doctorCards = document.querySelectorAll('.doctors-grid .doctor-card');

  if (filterButtons.length > 0 && doctorCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all filters and set on this one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        doctorCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.4s ease-out forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. APPOINTMENT FORM INTERACTION
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve values
      const name = document.getElementById('full-name').value.trim();
      const phone = document.getElementById('phone-number').value.trim();
      const email = document.getElementById('email-address').value.trim();
      const dept = document.getElementById('select-dept').value;
      const doctor = document.getElementById('select-doctor').value;
      const date = document.getElementById('preferred-date').value;
      const time = document.getElementById('preferred-time').value;

      if (!name || !phone || !email || !dept || !doctor || !date || !time) {
        alert('Please fill in all the required appointment details.');
        return;
      }

      // Hide form container and show Success message
      const parentCard = appointmentForm.parentElement;
      
      // Store in local storage (mock database save)
      const appointmentData = { name, phone, email, dept, doctor, date, time };
      localStorage.setItem('vitality_plus_appointment', JSON.stringify(appointmentData));

      // Scroll to the card top
      parentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Replace form or display success alert
      const successHTML = `
        <div class="success-alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.24Z" clip-rule="evenodd" />
          </svg>
          <div>
            <h4>Booking Request Submitted!</h4>
            <p>Thank you, <strong>${name}</strong>. Your appointment request for <strong>${dept}</strong> with <strong>${doctor}</strong> on <strong>${date} at ${time}</strong> has been received. We will send a confirmation message to <strong>${phone}</strong> shortly.</p>
          </div>
        </div>
        <button class="btn btn-navy" onclick="window.location.reload();">Book Another Appointment</button>
      `;

      // Set content after a small delay to simulate loading
      parentCard.innerHTML = `<h3 style="text-align:center; margin-bottom: 2rem; color: var(--medical-blue);">Processing Reservation...</h3>`;
      setTimeout(() => {
        parentCard.innerHTML = successHTML;
      }, 800);
    });
  }

  // 7. CONTACT FORM INTERACTION
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in your Name, Email, and Message.');
        return;
      }

      const parentCard = contactForm.parentElement;

      // Scroll to the card top
      parentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const successHTML = `
        <div class="success-alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.24Z" clip-rule="evenodd" />
          </svg>
          <div>
            <h4>Message Sent Successfully!</h4>
            <p>Thank you for contacting VitalityPlus, <strong>${name}</strong>. We have received your inquiry regarding <strong>"${subject || 'General Enquiry'}"</strong>. Our representative will email you back at <strong>${email}</strong> within 24 hours.</p>
          </div>
        </div>
      `;

      parentCard.innerHTML = `<h3 style="text-align:center; margin-bottom: 2rem; color: var(--medical-blue);">Sending Message...</h3>`;
      setTimeout(() => {
        parentCard.innerHTML = successHTML;
      }, 800);
    });
  }
});
