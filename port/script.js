// Typed.js initialization
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('#typed', {
        strings: ['Web Developer', 'Designer', 'Freelancer'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        backDelay: 2000
    });

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Skills animation with counters
    const skillBars = document.querySelectorAll('.progress');
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const targetWidth = bar.parentElement.dataset.progress || '80%';
                const percentage = parseInt(targetWidth);
                
                // Add percentage display
                const percentageDisplay = document.createElement('div');
                percentageDisplay.className = 'skill-percentage';
                percentageDisplay.textContent = `${percentage}%`;
                bar.parentElement.appendChild(percentageDisplay);
                
                // Animate progress bar
                bar.style.width = targetWidth;
                
                // Animate counter
                let current = 0;
                const duration = 1500; // 1.5 seconds
                const increment = percentage / (duration / 16); // 60fps
                
                const animateCounter = () => {
                    current += increment;
                    if (current < percentage) {
                        percentageDisplay.textContent = `${Math.round(current)}%`;
                        requestAnimationFrame(animateCounter);
                    } else {
                        percentageDisplay.textContent = `${percentage}%`;
                    }
                };
                
                animateCounter();
            }
        });
    };

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        animateSkills();
    });

    // Initial animations
    animateSkills();

    // Form handling
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form.');
        this.reset();
    });

    // Project data
    const projects = [
        {
            id: 1,
            title: "IQ Test Application",
            category: "frontend",
            image: "my.jpg",
            gallery: ["my.jpg", "my.jpg", "my.jpg"],
            description: "An interactive IQ test application that helps users assess their cognitive abilities through various types of questions and provides detailed results and analysis. The application features a user-friendly interface, timed questions, and comprehensive scoring system.",
            technologies: ["HTML", "CSS", "JavaScript"],
            liveDemo: "https://project-iq-test-online.vercel.app/",
            sourceCode: "https://github.com/rutik0007/Project-IQ-Test-Online"
        },
        {
            id: 2,
            title: "Hospital Appointment System",
            category: "fullstack",
            image: "my.jpg",
            gallery: ["my.jpg", "my.jpg", "my.jpg"],
            description: "A comprehensive hospital appointment management system that allows patients to book appointments online, manage their medical records, and communicate with healthcare providers. Features include user authentication, appointment scheduling, and medical history tracking.",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            liveDemo: "https://project-hospital-appointment-management-system-e481.vercel.app/",
            sourceCode: "https://github.com/rutik0007/Project-Hospital-Appointment-Management-System"
        }
    ];

    // Initialize projects
    function initializeProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.liveDemo}" target="_blank" class="demo-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="${project.sourceCode}" target="_blank" class="code-link"><i class="fab fa-github"></i> Source Code</a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description.substring(0, 100)}...</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Project filtering
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Project modal functionality
    function initializeModal() {
        const modal = document.getElementById('projectModal');
        const closeBtn = document.querySelector('.close-modal');
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-id');
                const project = projects.find(p => p.id === parseInt(projectId));
                
                if (project) {
                    document.getElementById('modalTitle').textContent = project.title;
                    document.getElementById('modalMainImage').src = project.image;
                    document.getElementById('modalDescription').textContent = project.description;
                    document.getElementById('modalTechStack').innerHTML = 
                        project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
                    document.getElementById('modalLiveDemo').href = project.liveDemo;
                    document.getElementById('modalSourceCode').href = project.sourceCode;
                    
                    // Update gallery thumbs
                    const modalThumbs = document.getElementById('modalThumbs');
                    modalThumbs.innerHTML = project.gallery.map(img => 
                        `<img src="${img}" alt="Thumbnail" onclick="changeMainImage(this.src)">`
                    ).join('');
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Change main image in modal
    function changeMainImage(src) {
        document.getElementById('modalMainImage').src = src;
    }

    // Testimonials Carousel
    function initializeTestimonials() {
        const container = document.querySelector('.testimonials-container');
        const prevBtn = document.querySelector('.prev-testimonial');
        const nextBtn = document.querySelector('.next-testimonial');
        const cardWidth = 370; // Width of each testimonial card + gap
        let scrollPosition = 0;

        function scrollTestimonials(direction) {
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            if (direction === 'next' && scrollPosition < maxScroll) {
                scrollPosition += cardWidth;
            } else if (direction === 'prev' && scrollPosition > 0) {
                scrollPosition -= cardWidth;
            }

            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }

        prevBtn.addEventListener('click', () => scrollTestimonials('prev'));
        nextBtn.addEventListener('click', () => scrollTestimonials('next'));

        // Auto-scroll testimonials
        let autoScrollInterval = setInterval(() => scrollTestimonials('next'), 5000);

        // Pause auto-scroll on hover
        container.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        container.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => scrollTestimonials('next'), 5000);
        });
    }

    // Language switcher
    function initializeLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        const translations = {
            en: {
                home: 'Home',
                about: 'About',
                skills: 'Skills',
                projects: 'Projects',
                contact: 'Contact',
                getInTouch: 'Get In Touch',
                downloadResume: 'Download Resume'
            },
            es: {
                home: 'Inicio',
                about: 'Sobre Mí',
                skills: 'Habilidades',
                projects: 'Proyectos',
                contact: 'Contacto',
                getInTouch: 'Contáctame',
                downloadResume: 'Descargar CV'
            },
            fr: {
                home: 'Accueil',
                about: 'À Propos',
                skills: 'Compétences',
                projects: 'Projets',
                contact: 'Contact',
                getInTouch: 'Me Contacter',
                downloadResume: 'Télécharger CV'
            }
        };

        function updateLanguage(lang) {
            // Update navigation links
            document.querySelector('a[href="#home"]').textContent = translations[lang].home;
            document.querySelector('a[href="#about"]').textContent = translations[lang].about;
            document.querySelector('a[href="#skills"]').textContent = translations[lang].skills;
            document.querySelector('a[href="#projects"]').textContent = translations[lang].projects;
            document.querySelector('a[href="#contact"]').textContent = translations[lang].contact;

            // Update CTA buttons
            document.querySelector('.cta-button').textContent = translations[lang].getInTouch;
            document.querySelector('.cta-button.secondary').innerHTML = 
                `<i class="fas fa-download"></i> ${translations[lang].downloadResume}`;
        }

        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                langButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                // Update language
                const lang = button.getAttribute('data-lang');
                updateLanguage(lang);
            });
        });
    }

    // 3D Background Animation
    function initialize3DBackground() {
        const canvas = document.getElementById('bg-canvas');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        camera.position.z = 2;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Initial setup
        renderer.setSize(window.innerWidth, window.innerHeight);
        animate();
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Initialize all features
    initializeProjects();
    initializeFilters();
    initializeModal();
    initializeTestimonials();
    initializeLanguageSwitcher();
    initialize3DBackground();
}); 