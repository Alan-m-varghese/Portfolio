/* --------------------------------------------------------
   DYNAMIC SYSTEM GLOBALS & DATA
   -------------------------------------------------------- */
const PROJECT_PREVIEWS = {
  laneway: {
    title: "LANEWAY.IN",
    desc: "Premium corporate site with highly responsive Elementor architecture and custom onboarding systems.",
    theme: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    accent: "#ff3f1a"
  },
  emdesigns: {
    title: "EMDESIGNS.IN",
    desc: "Minimalist portfolio showcasing high-end luxury interiors, architectural assets and editorial design layouts.",
    theme: "linear-gradient(135deg, #2c2a29 0%, #1c1a19 100%)",
    accent: "#ff3f1a"
  },
  cleopatra: {
    title: "CLEOPATRAFASHIONS.COM",
    desc: "High-end fashion boutique store displaying modern catalogs and secure, high-conversion shopping portals.",
    theme: "linear-gradient(135deg, #f7d6c8 0%, #e8bfae 100%)",
    accent: "#111111"
  },
  dropshippers: {
    title: "INDIANDROPSHIPPERS.IN",
    desc: "B2B dropshipping framework with robust inventory catalogs and logistical automated syncs.",
    theme: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
    accent: "#ff3f1a"
  },
  dermats: {
    title: "THEDERMATS.COM",
    desc: "Clinical skincare interface featuring digital skin consulting schedules and direct patient communication portals.",
    theme: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
    accent: "#ff3f1a"
  },
  collab: {
    title: "COLLAB VISUAL MEDIA",
    desc: "Responsive brand curation index and media production catalog running on fast GitHub pages.",
    theme: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
    accent: "#ff3f1a"
  },
  maxxo: {
    title: "MAXXO.IN",
    desc: "Dynamic performance portal focused on extreme layout fluidity, structural typography and rich media assets.",
    theme: "linear-gradient(135deg, #3f3f46 0%, #18181b 100%)",
    accent: "#ff3f1a"
  },
  caremind: {
    title: "CARE FOR HER MIND",
    desc: "Women's clinical mental health awareness archive optimized for quick loads on Netlify hosts.",
    theme: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    accent: "#047857"
  },
  melbeura: {
    title: "MELBEURA.IN",
    desc: "E-commerce interface displaying beautiful handmade ceramics and artisanal lifestyle goods.",
    theme: "linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)",
    accent: "#78716c"
  },
  kickora: {
    title: "KICKORA.CO.IN",
    desc: "Sports e-shop and digital catalog showcasing bespoke athletic designs and automated payment processing.",
    theme: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
    accent: "#ff3f1a"
  }
};

/* --------------------------------------------------------
   CUSTOM MOUSE CURSOR TRAIL (LERP EFFECT)
   -------------------------------------------------------- */
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('cursor-dot');

let mouseX = 0, mouseY = 0; // Mouse coords
let cursorX = 0, cursorY = 0; // Trail coords

// Smooth Cursor Interpolation (Linear Interpolation)
const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Directly snap the core micro dot to mouse coords immediately
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  // LERP the outer ring cursor for a smooth drag effect
  cursorX = lerp(cursorX, mouseX, 0.15);
  cursorY = lerp(cursorY, mouseY, 0.15);
  
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor States Trigger (Hover effects)
const interactiveElements = document.querySelectorAll('a, button, #grid-toggle-trigger, .dot-indicator, .work-row');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (el.classList.contains('work-row')) {
      document.body.classList.add('cursor-click-work');
    } else {
      document.body.classList.add('cursor-hover');
    }
  });
  
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover', 'cursor-click-work');
  });
});

/* --------------------------------------------------------
   DYNAMICS: COORDINATES TRACKER (Manifesto - Image 2)
   -------------------------------------------------------- */
const coordsTracker = document.getElementById('coords-tracker');
const coordX = document.getElementById('coord-x');
const coordY = document.getElementById('coord-y');

document.addEventListener('mousemove', (e) => {
  // If moving anywhere on the screen, update the coordinate tracker values
  if (coordX && coordY) {
    // Add padded zeroes to coordinates for tech aesthetic
    const xStr = String(e.clientX).padStart(4, '0');
    const yStr = String(e.clientY).padStart(4, '0');
    coordX.textContent = xStr;
    coordY.textContent = yStr;
  }
});

/* --------------------------------------------------------
   ARCHITECTURAL GRID TOGGLER (Toggle Grid Overlay)
   -------------------------------------------------------- */
const gridTrigger = document.getElementById('grid-toggle-trigger');
if (gridTrigger) {
  gridTrigger.addEventListener('click', () => {
    document.body.classList.toggle('grid-visible');
  });
}

/* --------------------------------------------------------
   DYNAMICS: DIGITAL CLOCK (IST Time Clock)
   -------------------------------------------------------- */
const clockDisplay = document.getElementById('clock-display');
function updateISTClock() {
  if (clockDisplay) {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const istTimeStr = new Intl.DateTimeFormat('en-US', options).format(new Date());
    clockDisplay.textContent = `${istTimeStr} IST`;
  }
}
setInterval(updateISTClock, 1000);
updateISTClock();

/* --------------------------------------------------------
   DYNAMICS: METRICS DYNAMIC COUNT-UP ANIMATION
   -------------------------------------------------------- */
let metricsAnimated = false;
function animateMetrics() {
  if (metricsAnimated) return;
  metricsAnimated = true;
  
  const stats = [
    { selector: '.impact-col:nth-child(1) .stat-big', endVal: 25, suffix: '+' },
    { selector: '.impact-col:nth-child(2) .stat-big', endVal: 15, suffix: '+' },
    { selector: '.impact-col:nth-child(3) .stat-big', endVal: 3, suffix: ' YR' }
  ];
  
  stats.forEach(stat => {
    const el = document.querySelector(stat.selector);
    if (!el) return;
    
    let startVal = 0;
    const duration = 1200; // ms
    const startTime = performance.now();
    
    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula for smooth decelerating animation
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * stat.endVal);
      
      if (stat.suffix === ' YR') {
        el.innerHTML = `${currentVal} <span class="text-highlight font-mono">YR</span>`;
      } else if (stat.suffix === '+') {
        el.innerHTML = `${currentVal}<span class="text-highlight">+</span>`;
      } else {
        el.innerHTML = currentVal + stat.suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }
    requestAnimationFrame(updateCount);
  });
}

/* --------------------------------------------------------
   DYNAMICS: INTERACTIVE SCROLL STATUS & DOT SYNC
   -------------------------------------------------------- */
const sections = document.querySelectorAll('section');
const dotIndicators = document.querySelectorAll('.dot-indicator');
const activeSectionTag = document.getElementById('active-section-tag');

const observerOptions = {
  root: null, // Viewport
  rootMargin: '-30% 0px -30% 0px', // Trigger near center screen
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeSectionId = entry.target.id;
      const sectionName = entry.target.getAttribute('data-section-name');
      
      // Update left sidebar vertical tag
      if (activeSectionTag) {
        activeSectionTag.textContent = sectionName;
      }
      
      // Trigger count-up metrics animation
      if (activeSectionId === 'impact') {
        animateMetrics();
      }
      
      // Update dot active class
      dotIndicators.forEach(dot => {
        const dotTarget = dot.getAttribute('href').substring(1);
        if (dotTarget === activeSectionId) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

/* --------------------------------------------------------
   DYNAMICS: FLOATING PREVIEW CARDS (Recent Works - Image 4)
   -------------------------------------------------------- */
const workRows = document.querySelectorAll('.work-row');
const hoverPreview = document.getElementById('hover-preview');
const pTitle = document.getElementById('p-title');
const pDesc = document.getElementById('p-desc');
const pScreen = document.getElementById('p-screen');

if (hoverPreview) {
  workRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const projKey = row.getAttribute('data-preview');
      const data = PROJECT_PREVIEWS[projKey];
      
      if (data) {
        pTitle.textContent = data.title;
        pDesc.textContent = data.desc;
        // Dynamically style vector background of preview screen
        pScreen.style.background = data.theme;
        
        // Find inner hero border and match theme
        const mockupHero = pScreen.querySelector('.mockup-hero');
        if (mockupHero) {
          mockupHero.style.borderColor = data.accent;
        }
      }
      
      hoverPreview.classList.add('visible');
    });

    row.addEventListener('mousemove', (e) => {
      // Offset card position slightly to avoid cursor overlap
      const offset = 20;
      hoverPreview.style.left = `${e.clientX + offset}px`;
      hoverPreview.style.top = `${e.clientY + offset}px`;
    });

    row.addEventListener('mouseleave', () => {
      hoverPreview.classList.remove('visible');
    });
  });
}

/* --------------------------------------------------------
   DYNAMICS: EMAIL COPY-TO-CLIPBOARD FUNCTION
   -------------------------------------------------------- */
const emailLink = document.getElementById('contact-email');
const copyTooltip = document.getElementById('copy-tooltip');

if (emailLink && copyTooltip) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent standard mailto trigger temporarily to copy first
    
    const email = "alanmvarghese123@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      // Transition tooltip
      copyTooltip.textContent = "COPIED TO CLIPBOARD!";
      copyTooltip.style.backgroundColor = "var(--accent-color)";
      copyTooltip.style.color = "var(--bg-color)";
      
      setTimeout(() => {
        copyTooltip.textContent = "CLICK TO COPY";
        copyTooltip.style.backgroundColor = "var(--text-color)";
        copyTooltip.style.color = "var(--bg-color)";
      }, 2000);
      
      // Execute mailto in a background process after a brief half-second delay
      setTimeout(() => {
        window.location.href = `mailto:${email}`;
      }, 500);
    }).catch(err => {
      // Fallback in case of copy restrictions
      window.location.href = `mailto:${email}`;
    });
  });
}

/* --------------------------------------------------------
   DYNAMICS: MOBILE HAMBURGER MENU INTERACTION
   -------------------------------------------------------- */
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

if (mobileNavToggle && mobileMenuOverlay) {
  const toggleMenu = () => {
    mobileNavToggle.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Freeze body scroll when menu is active
    if (document.body.classList.contains('menu-open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  mobileNavToggle.addEventListener('click', toggleMenu);

  // Close menu and restore scroll when any links are clicked
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavToggle.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });
}
