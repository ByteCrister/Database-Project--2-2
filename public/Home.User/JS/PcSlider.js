document.addEventListener('DOMContentLoaded', () => {
    let PcProductCurrentIndex = 0;
    let PcProductsSlidesToShow = 1; // Default to 1 slide per view
    const PcProductSlider = document.querySelector('.pc-product-slider');
    const PcProductSlides = document.querySelectorAll('.pc-product-slide');
    const PcTotalSlides = PcProductSlides.length;

    function updateSlidesToShow() {
        if (window.innerWidth >= 900) {
            PcProductsSlidesToShow = 4;
        } else if (window.innerWidth >= 600) {
            PcProductsSlidesToShow = 2;
        } else {
            PcProductsSlidesToShow = 1;
        }
    }

    function showSlide(index) {
        updateSlidesToShow();

        // Handle wrap-around
        if (index >= PcTotalSlides) {
            PcProductCurrentIndex = 0;
        } else if (index < 0) {
            PcProductCurrentIndex = PcTotalSlides - 1;
        } else {
            PcProductCurrentIndex = index;
        }

        const transformValue = -PcProductCurrentIndex * (100 / PcProductsSlidesToShow);
        PcProductSlider.style.transform = `translateX(${transformValue}%)`;
    }

    function PcProductNextSlide() {
        PcProductCurrentIndex += PcProductsSlidesToShow;
        if (PcProductCurrentIndex >= PcTotalSlides) {
            PcProductCurrentIndex = 0;
        }
        showSlide(PcProductCurrentIndex);
    }

    function PcProductPrevSlide() {
        PcProductCurrentIndex -= PcProductsSlidesToShow;
        if (PcProductCurrentIndex < 0) {
            PcProductCurrentIndex = PcTotalSlides - PcProductsSlidesToShow;
        }
        showSlide(PcProductCurrentIndex);
    }

    // Initial slide setup
    updateSlidesToShow();
    showSlide(PcProductCurrentIndex);

    // Update slides to show on window resize
    window.addEventListener('resize', () => {
        showSlide(PcProductCurrentIndex);
    });
    window.PcProductNextSlide = PcProductNextSlide;
    window.PcProductPrevSlide = PcProductPrevSlide;
})