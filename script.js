// Portfolio JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initProjectFilters();
  initContactForm();
  initCarDashboard();
  initSkillBars();
  initTypingEffect();
});

// Header scroll effect
function initNavigation() {
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav ul');
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
}

// Project filtering
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
          } else if (item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

// Contact form validation and submission
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameField = contactForm.querySelector('#name');
      const emailField = contactForm.querySelector('#email');
      const messageField = contactForm.querySelector('#message');
      
      // Simple validation
      let isValid = true;
      
      if (!nameField.value.trim()) {
        markInvalid(nameField, 'Please enter your name');
        isValid = false;
      } else {
        markValid(nameField);
      }
      
      if (!emailField.value.trim()) {
        markInvalid(emailField, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailField.value)) {
        markInvalid(emailField, 'Please enter a valid email address');
        isValid = false;
      } else {
        markValid(emailField);
      }
      
      if (!messageField.value.trim()) {
        markInvalid(messageField, 'Please enter your message');
        isValid = false;
      } else {
        markValid(messageField);
      }
      
      // If form is valid, show success message
      if (isValid) {
        // In a real application, you would send the form data to a server here
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = 'Message Sent!';
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 3000);
        }, 1500);
      }
    });
  }
  
  // Helper functions for form validation
  function markInvalid(field, message) {
    field.classList.add('is-invalid');
    
    // Create or update error message
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
  }
  
  function markValid(field) {
    field.classList.remove('is-invalid');
    
    // Remove error message if it exists
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Car Dashboard functionality
function initCarDashboard() {
  // Check if we're on the cars page
  const carDashboard = document.querySelector('.car-dashboard');
  
  if (carDashboard) {
    // Load cars from localStorage
    let cars = JSON.parse(localStorage.getItem('myCars')) || [];
    
    // Add car function
    window.addCar = function() {
      const name = document.getElementById('carName').value;
      const year = document.getElementById('carYear').value;
      
      if (!name || !year) {
        alert('Please enter car name and year.');
        return;
      }
      
      const newCar = { name, year };
      cars.push(newCar);
      localStorage.setItem('myCars', JSON.stringify(cars));
      
      document.getElementById('carName').value = '';
      document.getElementById('carYear').value = '';
      
      renderGarage();
    };
    
    // Remove car function
    window.removeCar = function(index) {
      cars.splice(index, 1);
      localStorage.setItem('myCars', JSON.stringify(cars));
      renderGarage();
    };
    
    // Simulate drive function
    window.simulateDrive = function() {
      const speed = Math.floor(Math.random() * 120);
      const fuel = Math.max(0, 100 - Math.floor(Math.random() * 50));
      const battery = Math.max(0, 100 - Math.floor(Math.random() * 30));
      const temp = 70 + Math.floor(Math.random() * 30);
      
      document.getElementById('speed').textContent = speed;
      document.getElementById('fuel').textContent = fuel;
      document.getElementById('battery').textContent = battery;
      document.getElementById('temp').textContent = temp;
      
      // Add animation effect to stats
      const stats = document.querySelectorAll('.stat');
      stats.forEach(stat => {
        stat.classList.add('highlight');
        setTimeout(() => {
          stat.classList.remove('highlight');
        }, 1000);
      });
    };
    
    // Render garage function
    function renderGarage() {
      const garageDiv = document.getElementById('garage');
      if (!garageDiv) return;
      
      garageDiv.innerHTML = '';
      
      if (cars.length === 0) {
        garageDiv.innerHTML = '<p>No cars in your garage yet. Add your first car above!</p>';
        return;
      }
      
      cars.forEach((car, index) => {
        const carElement = document.createElement('div');
        carElement.className = 'stat fade-in';
        carElement.innerHTML = `
          <strong>${car.name}</strong> (${car.year})
          <button onclick="removeCar(${index})" class="btn btn-small">Remove</button>
        `;
        garageDiv.appendChild(carElement);
      });
      
      // Trigger animation for new elements
      setTimeout(() => {
        document.querySelectorAll('#garage .fade-in').forEach(el => {
          el.classList.add('visible');
        });
      }, 100);
    }
    
    // Initial render
    renderGarage();
  }
}

// Animate skill bars
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const percentage = progressBar.getAttribute('data-progress') + '%';
          
          progressBar.style.width = percentage;
          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }
}

// Typing effect for hero section
function initTypingEffect() {
  const element = document.querySelector('.typing-text');
  
  if (element) {
    const texts = JSON.parse(element.getAttribute('data-texts'));
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        // Deleting text
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Typing text
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      // If finished typing the current text
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause before deleting
      }
      
      // If finished deleting the current text
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
  }
}