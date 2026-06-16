// Dynamic Interaction & Smooth Scroll Behaviors

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navigation Bar ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Hamburger Menu ---
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && 
        !navLinks.contains(e.target) && 
        !menuBtn.contains(e.target)) {
      toggleMenu();
    }
  });

  // --- Dynamic Typing Effect ---
  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');
  const textArray = ["Full Stack Developer", "UI/UX Designer", "Software Engineer", "Problem Solver"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if(textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  if(textArray.length && typedTextSpan) {
    setTimeout(type, newTextDelay);
  }

  // --- Scrollspy: Highlight Active Nav Link ---
  const sections = document.querySelectorAll('section');
  const navLinkList = document.querySelectorAll('.nav-link');

  const scrollspyOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px', // Triggers when section is roughly in center viewport
    threshold: 0
  };

  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, scrollspyOptions);

  sections.forEach(section => {
    scrollspyObserver.observe(section);
  });

  // --- Reveal on Scroll Animation ---
  // We'll dynamically add simple CSS transitions for fade-up animation.
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const revealElements = document.querySelectorAll('.stat-card, .skill-card, .project-card, .about-text, .about-stats, .contact-info, .contact-form-card');
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Contact Form Simulation ---
  const contactForm = document.getElementById('contact-form');
  const submitStatus = document.getElementById('submit-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Temporary loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Mock delay to simulate network call
      setTimeout(() => {
        if (name && email && subject && message) {
          // Success
          submitStatus.className = 'submit-status success';
          submitStatus.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
          contactForm.reset();
          
          // Clear floating labels manually by resetting inputs and trigger state
          document.querySelectorAll('.form-input').forEach(input => {
            input.dispatchEvent(new Event('input'));
          });
        } else {
          // Error
          submitStatus.className = 'submit-status error';
          submitStatus.textContent = 'Please fill out all fields correctly.';
        }
        
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide status after 5 seconds
        setTimeout(() => {
          submitStatus.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  // --- Scroll To Top Button ---
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
