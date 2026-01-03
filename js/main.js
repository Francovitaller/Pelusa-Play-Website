document.addEventListener('DOMContentLoaded', () => {

    const words = [
        'torneo',
        'liga',
        'competencia',
        'campeonato',
        'fixture'
    ];

    const textEl = document.getElementById('rotating-text');
    let index = 0;
    const delay = 2600;
    const transition = 400;

    setInterval(() => {
        textEl.classList.add('rotate-out');

        setTimeout(() => {
            index = (index + 1) % words.length;
            textEl.textContent = words[index];
            textEl.classList.remove('rotate-out');
            textEl.classList.add('rotate-in');
        }, transition);

    }, delay);
});


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.ps-card');
    const connector = document.querySelector('.ps-connector');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    if (entry.target.classList.contains('ps-card--solution')) {
                        connector.classList.add('is-active');
                    }
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    cards.forEach(card => observer.observe(card));
});


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 120);
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    cards.forEach(card => observer.observe(card));
});
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.how-it-works');
    const stepsWrapper = document.querySelector('.steps');
    const steps = [...document.querySelectorAll('.step')];

    if (!section || !stepsWrapper || steps.length === 0) return;

    const animateCounter = (el, target) => {
        let current = 0;
        const duration = 400;
        const start = performance.now();

        const update = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            current = Math.floor(progress * target);
            el.textContent = String(current).padStart(2, '0');

            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    const onScroll = () => {
        const sectionRect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const totalScroll = sectionRect.height - viewportHeight;
        const currentScroll = Math.min(
            Math.max(-sectionRect.top, 0),
            totalScroll
        );

        const progress = totalScroll > 0
            ? currentScroll / totalScroll
            : 0;

        stepsWrapper.style.setProperty(
            '--progress',
            `${progress * 100}%`
        );

        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            const center = rect.top + rect.height / 2;

            const isActive =
                center > viewportHeight * 0.35 &&
                center < viewportHeight * 0.65;

            if (isActive && !step.classList.contains('is-active')) {
                const indexEl = step.querySelector('.step__index');
                animateCounter(indexEl, index + 1);
            }

            step.classList.toggle('is-active', isActive);
            step.classList.toggle('is-visible', center < viewportHeight * 0.9);
        });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('resize', onScroll);
    onScroll();
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.use-case-card');

    if (!buttons.length || !cards.length) {
        console.warn('No se encontraron botones o cards');
        return;
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Estado activo
            buttons.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            cards.forEach(card => {
                const type = card.dataset.type;

                if (filter === 'all' || type === filter) {
                    card.style.display = 'block';
                    requestAnimationFrame(() => {
                        card.classList.remove('is-hidden');
                    });
                } else {
                    card.classList.add('is-hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const cta = document.querySelector('.final-cta');
    const counter = document.querySelector('.final-cta__counter');

    if (!cta || !counter) return;

    let hasAnimated = false;

    const animateCounter = (el) => {
        const target = +el.dataset.target;
        let current = 0;
        const duration = 1600;
        const start = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            current = Math.floor(progress * target);
            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            cta.classList.add('is-visible');
            animateCounter(counter);
            observer.disconnect();
        }
    }, { threshold: 0.4 });

    observer.observe(cta);if (entry.isIntersecting && !hasAnimated) {
    hasAnimated = true;
    cta.classList.add('is-visible');

    setTimeout(() => {
        animateCounter(counter);
    }, 150);

    observer.disconnect();
}
});
