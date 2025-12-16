/**
 * Brightkeyz Infrastructure - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // ========================================
    // Mobile Navigation
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // ========================================
    // Smooth Scrolling for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ========================================
    // EMI Calculator
    // ========================================
    const emiForm = document.getElementById('emiForm');
    let currentTenureView = 'monthly';

    window.calculateEMI = function () {
        const principal = parseFloat(document.getElementById('loanAmount')?.value) || 0;
        const rate = parseFloat(document.getElementById('interestRate')?.value) || 0;
        const tenure = parseFloat(document.getElementById('loanTenure')?.value) || 0;

        if (principal > 0 && rate > 0 && tenure > 0) {
            const monthlyRate = rate / 12 / 100;
            const months = tenure * 12;

            const monthlyEmi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
            const totalPayment = monthlyEmi * months;
            const totalInterest = totalPayment - principal;

            // Update results based on view
            const emiResult = document.getElementById('emiResult');
            const emiLabel = document.getElementById('emiLabel');
            const totalInterestResult = document.getElementById('totalInterest');
            const totalPaymentResult = document.getElementById('totalPayment');

            if (currentTenureView === 'yearly') {
                if (emiResult) emiResult.textContent = formatCurrency(monthlyEmi * 12);
                if (emiLabel) emiLabel.textContent = 'Yearly EMI';
            } else {
                if (emiResult) emiResult.textContent = formatCurrency(monthlyEmi);
                if (emiLabel) emiLabel.textContent = 'Monthly EMI';
            }
            if (totalInterestResult) totalInterestResult.textContent = formatCurrency(totalInterest);
            if (totalPaymentResult) totalPaymentResult.textContent = formatCurrency(totalPayment);
        }
    }

    window.setTenureView = function (view) {
        currentTenureView = view;
        const buttons = document.querySelectorAll('.tenure-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === view) {
                btn.classList.add('active');
            }
        });
        calculateEMI();
    }

    function formatCurrency(amount) {
        return '₹ ' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (emiForm) {
        emiForm.addEventListener('submit', function (e) {
            e.preventDefault();
            calculateEMI();
        });

        // Initial calculation
        calculateEMI();
    }

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                // Show success message (in real app, send to server)
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // ========================================
    // Scroll Animations
    // ========================================

    // Elements to animate on scroll
    const scrollAnimateElements = document.querySelectorAll(`
        .feature-card,
        .service-card,
        .project-card,
        .testimonial-card,
        .spectrum-card,
        .emi-benefit-card,
        .value-card,
        .completed-project-card,
        .section-header,
        .about-content,
        .about-images,
        .mv-row,
        .make-row,
        .founder-content,
        .service-row,
        .service-row-content,
        .team-member-new,
        .counter-stats-grid,
        .what-you-get-item,
        .welcome-content,
        .cta-content,
        .dream-cta-content,
        .contact-form-col,
        .contact-content-col,
        .service-modern-card,
        .faq-item
    `);

    // Add scroll-animate class and set initial styles
    scrollAnimateElements.forEach((el, index) => {
        el.classList.add('scroll-animate');

        // Stagger delay for cards in same row
        const isCard = el.classList.contains('feature-card') ||
            el.classList.contains('service-card') ||
            el.classList.contains('project-card') ||
            el.classList.contains('completed-project-card') ||
            el.classList.contains('spectrum-card') ||
            el.classList.contains('emi-benefit-card') ||
            el.classList.contains('value-card') ||
            el.classList.contains('team-member-new') ||
            el.classList.contains('what-you-get-item') ||
            el.classList.contains('service-modern-card') ||
            el.classList.contains('faq-item');

        if (isCard) {
            el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        }
    });

    // Intersection Observer for scroll animations
    const scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    // Observe all scroll-animate elements
    scrollAnimateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // ========================================
    // Text Animations
    // ========================================

    // Text elements to animate
    const textAnimateElements = document.querySelectorAll(`
        .section-title,
        .section-subtitle,
        .page-title,
        .hero-title,
        .hero-text,
        .welcome-title,
        .welcome-subtitle,
        .welcome-text,
        .full-spectrum-title,
        .full-spectrum-subtitle,
        .services-main-title,
        .services-tag,
        .services-main-desc,
        .faq-title,
        .faq-tag,
        .faq-subtitle,
        .testimonials-title,
        .testimonials-subtitle,
        .what-we-make-title,
        .what-you-get-title,
        .what-you-get-desc,
        .contact-heading,
        .contact-label,
        .contact-text,
        .cta-content h2,
        .cta-content p,
        .dream-cta-text h2,
        .dream-cta-text p,
        .about-text,
        .make-content h3,
        .make-content p
    `);

    // Add text-animate class to text elements
    textAnimateElements.forEach((el, index) => {
        // Don't add if already has animation class
        if (!el.classList.contains('scroll-animate') && !el.classList.contains('text-animate')) {
            el.classList.add('text-animate');

            // Add stagger delay based on siblings
            const parent = el.parentElement;
            if (parent) {
                const siblings = Array.from(parent.children).filter(child =>
                    child.classList.contains('text-animate')
                );
                const siblingIndex = siblings.indexOf(el);
                if (siblingIndex > 0 && siblingIndex < 5) {
                    el.classList.add(`text-delay-${siblingIndex}`);
                }
            }
        }
    });

    // Intersection Observer for text animations
    const textObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                textObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all text-animate elements
    document.querySelectorAll('.text-animate').forEach(el => {
        textObserver.observe(el);
    });

    // ========================================
    // Counter Animation
    // ========================================
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                let count = 0;
                const increment = target / 50;
                const suffix = counter.textContent.includes('+') ? '+' : '';

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========================================
    // Project Filter (for projects page)
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function () {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});
