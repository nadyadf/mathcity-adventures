const Swiper = {
  init({slides, nextEl, prevEl, slideIndex}) {
    this.showSlide(slides, slideIndex);
    nextEl.addEventListener('click', (e) => {
      this._plusSlide(e, slides, slideIndex, 1);
    });

    prevEl.addEventListener('click', (e) => {
      this._plusSlide(e, slides, slideIndex, -1);
    });

    
  },

  _plusSlide(e, slides, slideIndex, n) {
    e.preventDefault();
    const newIndex = slideIndex + n;

    const newUrl = `#/lobby?id=${newIndex}`;
    window.history.pushState({ id: newIndex }, '', newUrl);

    this.showSlide(slides, newIndex);

    
  },

  showSlide(slides, slideIndex) {
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'flex';
  },
};

export default Swiper;