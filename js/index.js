const initSlider = () => {
    const imagelist = document.querySelector(".slider_c .slider_li");
    const slideButtons = document.querySelectorAll(".slider_c .fa");
    const sliderScrollbar = document.querySelector(".container .slider_scrollbar");
    const scrollbarthumb = sliderScrollbar.querySelector(".scrollbar_thumb");
    const maxScrollLeft = imagelist.scrollWidth - imagelist.clientWidth;

    // Function to handle button clicks to scroll the slider
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev_slide" ? -1 : 1;
            const scrollAmount = imagelist.clientWidth * direction;
            imagelist.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSliderButtons = () => {
        slideButtons[0].style.display = imagelist.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imagelist.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateScrollThumbPosition = () => {
        const scrollPosition = imagelist.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarthumb.offsetWidth);
        scrollbarthumb.style.left = `${thumbPosition}px`;
    };

    const updateImageListScroll = (thumbPosition) => {
        const newScrollLeft = (thumbPosition / (sliderScrollbar.clientWidth - scrollbarthumb.offsetWidth)) * maxScrollLeft;
        imagelist.scrollLeft = newScrollLeft;
    };

    imagelist.addEventListener("scroll", () => {
        handleSliderButtons();
        updateScrollThumbPosition();
    });

    // Drag functionality for scrollbar thumb
    let isDragging = false;
    let startX;

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const moveDistance = e.clientX - startX;
        const thumbPosition = Math.min(Math.max(0, scrollbarthumb.offsetLeft + moveDistance), sliderScrollbar.clientWidth - scrollbarthumb.offsetWidth);
        scrollbarthumb.style.left = `${thumbPosition}px`;
        updateImageListScroll(thumbPosition);
        startX = e.clientX;
    };

    const onMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
        document.addEventListener("mousemove", onMouseMove);
    };

    const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
    };

    scrollbarthumb.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
};

window.addEventListener("load", initSlider);
