const Swiper = {
  init({slides, nextEl, prevEl, slideIndex}) {
    this._showSlide(slides, slideIndex);
    nextEl.addEventListener('click', (e) => {
      this._plusSlide(e, slides, slideIndex, 1);
    });

    prevEl.addEventListener('click', (e) => {
      this._plusSlide(e, slides, slideIndex, -1);
    });
  },

  _plusSlide(e, slides, slideIndex, n) {
    e.preventDefault();
    this._showSlide(slides, slideIndex += n);
  },

  _showSlide(slides, slideIndex) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'flex';
  },
};

export default Swiper;