document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.getElementById("console-slideshow");
  const slides = slideshow.getElementsByClassName("slideshow-items")[0].children;
  let visibleIdx = 0;

  const prevButton = document.createElement("div");
  prevButton.classList.add("prev-button");
  slideshow.appendChild(prevButton);

  const nextButton = document.createElement("div");
  nextButton.classList.add("next-button");
  slideshow.appendChild(nextButton);

  const makeInvisible = (elem) => {
    elem.style.display = "none";
  };

  const makeVisible = (elem) => {
    elem.style.display = "";
  };

  hideAllSlidesButFirst = () => {
    for (let i = 1; i < slides.length; i += 1) {
      makeInvisible(slides[i]);
    }
  };

  const handlePreviousClick = (e) => {

    makeInvisible(slides[visibleIdx]);

    if (visibleIdx === 0) {
      visibleIdx = slides.length - 1;
    } else{
      visibleIdx -= 1;
    }

    makeVisible(slides[visibleIdx]);
  };

  const handleNextClick = (e) => {

    makeInvisible(slides[visibleIdx]);

    if (visibleIdx === slides.length - 1) {
      visibleIdx = 0;
    } else{
      visibleIdx += 1;
    }

    makeVisible(slides[visibleIdx]);
  };

  prevButton.addEventListener("click", handlePreviousClick);
  nextButton.addEventListener("click", handleNextClick);

  hideAllSlidesButFirst();
});