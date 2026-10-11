/**
 * SCRIPT.JS - Interaktivitas Portofolio
 * Aulia Nurzahra Anantiyo
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('show')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Navbar Styling on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 20px rgba(160, 130, 125, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. Copy Email to Clipboard Feature
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const copyFeedback = document.getElementById('copyFeedback');

  if (copyBtn && emailText && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      const emailToCopy = emailText.textContent.trim();

      try {
        await navigator.clipboard.writeText(emailToCopy);
        const originalText = copyFeedback.textContent;
        const icon = copyBtn.querySelector('i');
        
        copyFeedback.textContent = 'Tersalin!';
        if (icon) {
          icon.classList.remove('fa-copy');
          icon.classList.add('fa-check');
        }

        setTimeout(() => {
          copyFeedback.textContent = originalText;
          if (icon) {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
          }
        }, 2500);
      } catch (err) {
        console.error('Gagal menyalin:', err);
      }
    });
  }
});
