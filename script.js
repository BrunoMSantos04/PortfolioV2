document.addEventListener('DOMContentLoaded', function() {
  
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        window.scrollTo({
            top: element.offsetTop - 60,
            behavior: 'smooth'
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    
    const typeWriter = (element, text, speed) => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    const heroSubtitle = document.querySelector('.hero h2');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        typeWriter(heroSubtitle, originalText, 100);
    }

    
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.15
    });

    document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(item => {
        observer.observe(item);
    });

    
    const animateSkills = () => {
        const skills = document.querySelectorAll('.skill-progress');
        skills.forEach(skill => {
            const percentage = skill.getAttribute('data-percentage');
            skill.style.width = percentage + '%';
        });
    };

    
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.number-stat');
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            let count = 0;
            const timer = setInterval(() => {
                if (count < target) {
                    count++;
                    number.textContent = count;
                } else {
                    clearInterval(timer);
                }
            }, 20);
        });
    };

    
    const experienceSection = document.querySelector('#experiencia');
    const skillsSection = document.querySelector('#habilidades');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'experiencia') {
                    animateNumbers();
                } else if (entry.target.id === 'habilidades') {
                    animateSkills();
                }
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (experienceSection) sectionObserver.observe(experienceSection);
    if (skillsSection) sectionObserver.observe(skillsSection);

    
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
});


const heroSubtitle = document.querySelector('.hero h2.typewriter');
if (heroSubtitle) {
    const texts = ["Desenvolvedor Full Stack", "Apaixonado por Tecnologia", "Solucionador de Problemas"];
    let textIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < texts[textIndex].length) {
            heroSubtitle.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            heroSubtitle.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
        }
    }

    typeWriter();
}