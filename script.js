document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicator = document.getElementById('slideIndicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        indicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
        
        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        prevBtn.style.cursor = currentSlide === 0 ? 'default' : 'pointer';
        
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
        nextBtn.style.cursor = currentSlide === totalSlides - 1 ? 'default' : 'pointer';
    }

    function goToNextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    // Touch navigation for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isTouchOnScrollable = false;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        // Если касание произошло внутри блока с картинкой, запоминаем это
        isTouchOnScrollable = !!e.target.closest('.template-image');
    }, {passive: true});

    document.addEventListener('touchend', e => {
        if (isTouchOnScrollable) return; // Игнорируем свайп, если юзер листает скриншот
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            goToNextSlide();
        }
        if (touchEndX > touchStartX + threshold) {
            goToPrevSlide();
        }
    }

    // Initialize
    updateSlides();
});
