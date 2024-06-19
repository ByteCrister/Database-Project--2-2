document.addEventListener('DOMContentLoaded', () => {

    let productCurrentIndex = 0;
    let productsSlidesToShow = 1; // Default to 1 slide per view
    const productSlider = document.querySelector('.ram-product-slider');
    const productSlides = document.querySelectorAll('.ram-product-slide');
    const totalSlides = productSlides.length;
    
    function updateSlidesToShow() {
        if (window.innerWidth >= 900) {
            productsSlidesToShow = 4;
        } else if (window.innerWidth >= 600) {
            productsSlidesToShow = 2;
        } else {
            productsSlidesToShow = 1;
        }
    }
    
    function showSlide(index) {
        updateSlidesToShow();
    
        // Handle wrap-around
        if (index >= totalSlides) {
            productCurrentIndex = 0;
        } else if (index < 0) {
            productCurrentIndex = totalSlides - 1;
        } else {
            productCurrentIndex = index;
        }
    
        const transformValue = -productCurrentIndex * (100 / productsSlidesToShow);
        productSlider.style.transform = `translateX(${transformValue}%)`;
    }
    
    function RamProductNextSlide() {
        productCurrentIndex += productsSlidesToShow;
        if (productCurrentIndex >= totalSlides) {
            productCurrentIndex = 0;
        }
        showSlide(productCurrentIndex);
    }
    
    function RamProductPrevSlide() {
        productCurrentIndex -= productsSlidesToShow;
        if (productCurrentIndex < 0) {
            productCurrentIndex = totalSlides - productsSlidesToShow;
        }
        showSlide(productCurrentIndex);
    }
    
    // Initial slide setup
    updateSlidesToShow();
    showSlide(productCurrentIndex);
    
    // Update slides to show on window resize
    window.addEventListener('resize', () => {
        showSlide(productCurrentIndex);
    });
    window.RamProductNextSlide = RamProductNextSlide;
    window.RamProductPrevSlide = RamProductPrevSlide;
})

