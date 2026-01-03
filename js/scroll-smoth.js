document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('[data-scroll]');

    triggers.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();

            const targetSelector = el.dataset.target;
            if (!targetSelector) return;

            const target = document.querySelector(targetSelector);
            if (!target) return;

            const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
});
