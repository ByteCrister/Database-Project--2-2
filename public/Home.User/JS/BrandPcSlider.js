document.addEventListener('DOMContentLoaded', () => {
    let brandPcProductCurrentIndex = 0;
    let brandPcProductsSlidesToShow = 1;
    const brandPcProductSlider = document.querySelector('.brand-pc-product-slider');
    const brandPcProductSlides = document.querySelectorAll('.brand-pc-product-slide');
    const brandPcTotalSlides = brandPcProductSlides.length;

    function updateSlidesToShow() {
        if (window.innerWidth >= 900) {
            brandPcProductsSlidesToShow = 4;
        } else if (window.innerWidth >= 600) {
            brandPcProductsSlidesToShow = 2;
        } else {
            brandPcProductsSlidesToShow = 1;
        }
    }

    function showSlide(index) {
        updateSlidesToShow();
        if (index >= brandPcTotalSlides) {
            brandPcProductCurrentIndex = 0;
        } else if (index < 0) {
            brandPcProductCurrentIndex = brandPcTotalSlides - 1;
        } else {
            brandPcProductCurrentIndex = index;
        }
        const transformValue = -brandPcProductCurrentIndex * (100 / brandPcProductsSlidesToShow);
        brandPcProductSlider.style.transform = `translateX(${transformValue}%)`;
    }

    function BrandPcProductNextSlide() {
        brandPcProductCurrentIndex += brandPcProductsSlidesToShow;
        if (brandPcProductCurrentIndex >= brandPcTotalSlides) {
            brandPcProductCurrentIndex = 0;
        }
        showSlide(brandPcProductCurrentIndex);
    }

    function BrandPcProductPrevSlide() {
        brandPcProductCurrentIndex -= brandPcProductsSlidesToShow;
        if (brandPcProductCurrentIndex < 0) {
            brandPcProductCurrentIndex = brandPcTotalSlides - brandPcProductsSlidesToShow;
        }
        showSlide(brandPcProductCurrentIndex);
    }

    // Initial slide setup
    updateSlidesToShow();
    showSlide(brandPcProductCurrentIndex);

    // Update slides to show on window resize
    window.addEventListener('resize', () => {
        showSlide(brandPcProductCurrentIndex);
    });

    // Expose functions to the global scope
    window.BrandPcProductNextSlide = BrandPcProductNextSlide;
    window.BrandPcProductPrevSlide = BrandPcProductPrevSlide;
});