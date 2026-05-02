document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('open')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                if(icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });
        });
    }

    /* ==========================================================================
       Sticky Header
       ========================================================================== */
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    /* ==========================================================================
       Scroll Reveal Animation
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                entry.target.classList.add('visible'); // For fade-in-up
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
    fadeElements.forEach(el => revealOnScroll.observe(el));

    // Initially show elements in hero section on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    /* ==========================================================================
       Sparkles Text Effect
       ========================================================================== */
    const initSparkles = () => {
        const sparklesContainers = document.querySelectorAll('.sparkles-container');
        
        sparklesContainers.forEach(container => {
            const count = 10;
            const colors = ['#9E7AFF', '#FE8BBB']; // Purple and Pink
            
            for (let i = 0; i < count; i++) {
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("class", "sparkle-icon");
                svg.setAttribute("width", "21");
                svg.setAttribute("height", "21");
                svg.setAttribute("viewBox", "0 0 21 21");
                
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", "M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z");
                
                const color = Math.random() > 0.5 ? colors[0] : colors[1];
                path.setAttribute("fill", color);
                
                const x = `${Math.random() * 100}%`;
                const y = `${Math.random() * 100}%`;
                const scale = Math.random() * 1 + 0.3;
                const delay = `${Math.random() * 2}s`;
                const duration = `${Math.random() * 1 + 0.8}s`;
                
                svg.style.left = x;
                svg.style.top = y;
                svg.style.setProperty('--sparkle-scale', scale);
                svg.style.setProperty('--sparkle-delay', delay);
                svg.style.setProperty('--sparkle-duration', duration);
                
                svg.appendChild(path);
                container.appendChild(svg);
            }
        });
    };
    initSparkles();

    /* ==========================================================================
       Flickering Grid Animation (Dark Section)
       ========================================================================== */
    const flickerCanvas = document.getElementById('flickering-grid');
    if (flickerCanvas) {
        const ctx = flickerCanvas.getContext('2d');
        const squareSize = 4;
        const gridGap = 4;
        const flickerChance = 0.15;
        const maxOpacity = 0.2;
        const colorRGB = '70, 65, 212'; // Sielp Bright Blue

        let cols, rows, squares, dpr;
        let animationFrameId;

        const setupCanvas = () => {
            const container = flickerCanvas.parentElement;
            dpr = window.devicePixelRatio || 1;
            
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            flickerCanvas.width = width * dpr;
            flickerCanvas.height = height * dpr;
            
            flickerCanvas.style.width = `${width}px`;
            flickerCanvas.style.height = `${height}px`;

            cols = Math.floor(width / (squareSize + gridGap));
            rows = Math.floor(height / (squareSize + gridGap));

            squares = new Float32Array(cols * rows);
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random() * maxOpacity;
            }
        };

        const updateSquares = (deltaTime) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * deltaTime) {
                    squares[i] = Math.random() * maxOpacity;
                }
            }
        };

        const drawGrid = () => {
            ctx.clearRect(0, 0, flickerCanvas.width, flickerCanvas.height);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const opacity = squares[i * rows + j];
                    ctx.fillStyle = `rgba(${colorRGB}, ${opacity})`;
                    ctx.fillRect(
                        i * (squareSize + gridGap) * dpr,
                        j * (squareSize + gridGap) * dpr,
                        squareSize * dpr,
                        squareSize * dpr
                    );
                }
            }
        };

        let lastTime = 0;
        const animate = (time) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            if (deltaTime < 0.1) {
                updateSquares(deltaTime);
                drawGrid();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        setupCanvas();

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                lastTime = performance.now();
                animate(lastTime);
            } else {
                cancelAnimationFrame(animationFrameId);
            }
        });
        observer.observe(flickerCanvas);

        window.addEventListener('resize', () => {
            setupCanvas();
        });
    }
});
