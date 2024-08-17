document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links internos
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

    // Efeito de digitação para o título da seção hero
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

    // Animação de entrada para elementos quando scrollados para a view
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

    // Animação de progresso para as habilidades
    const animateSkills = () => {
        const skills = document.querySelectorAll('.skill-progress');
        skills.forEach(skill => {
            const percentage = skill.getAttribute('data-percentage');
            skill.style.width = percentage + '%';
        });
    };

    // Animação de contagem para os números de experiência
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

    // Ativar animações quando a seção correspondente estiver visível
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

    // Efeito parallax simples para a seção hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
});

// Efeito de digitação para o subtítulo da seção hero
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