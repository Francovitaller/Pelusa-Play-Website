document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openLogin');
    const closeBtn = document.getElementById('closeLogin');
    const overlay = document.getElementById('loginOverlay');

    if (!openBtn || !overlay || !closeBtn) {
        console.error('IDs no encontrados');
        return;
    }

    openBtn.addEventListener('click', () => {
        overlay.classList.add('is-active');
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('is-active');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('is-active');
        }
    });
});
