const makeInvisible = (elem) => {
  elem.style.display = "none";
};

const makeVisible = (elem) => {
  elem.style.display = "";
};

const main = () => {
  const slideshow = document.getElementById("console-slideshow");
  const slides = slideshow.getElementsByClassName("slideshow-items")[0]
    .children;
  const prevButton = slideshow.getElementsByClassName("prev-button")[0];
  const nextButton = slideshow.getElementsByClassName("next-button")[0];
  let visibleIdx = 0;

  for (let i = 1; i < slides.length; i += 1) {
    makeInvisible(slides[i]);
  }

  makeVisible(prevButton);
  makeVisible(nextButton);

  const handlePreviousClick = () => {
    makeInvisible(slides[visibleIdx]);

    if (visibleIdx === 0) {
      visibleIdx = slides.length - 1;
    } else {
      visibleIdx -= 1;
    }

    makeVisible(slides[visibleIdx]);
  };

  const handleNextClick = () => {
    makeInvisible(slides[visibleIdx]);

    if (visibleIdx === slides.length - 1) {
      visibleIdx = 0;
    } else {
      visibleIdx += 1;
    }

    makeVisible(slides[visibleIdx]);
  };

  const setButtonPositions = () => {
    const imgWidth = slides[visibleIdx].firstElementChild.clientWidth;
    const btnWidth = prevButton.clientWidth; // Both buttons are of same width
    const slideshowWidth = slideshow.clientWidth;
    const margin = 10;

    const position = (slideshowWidth - imgWidth) / 2 - btnWidth - margin;

    prevButton.style.left = `${position}px`;
    nextButton.style.right = `${position}px`;
  };

  prevButton.addEventListener("click", handlePreviousClick);
  nextButton.addEventListener("click", handleNextClick);
  window.addEventListener("resize", setButtonPositions);

  // Initialize the button positions once the page loads
  window.addEventListener("load", setButtonPositions);
};

document.addEventListener("DOMContentLoaded", main);
