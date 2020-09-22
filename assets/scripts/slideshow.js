const makeInvisible = (elem) => {
  elem.style.display = "none";
};

const makeVisible = (elem) => {
  elem.style.display = "";
};

const makeSlideshowButton = (type, parent) => {
  const button = document.createElement("div");

  button.classList.add(`${type}-button`);
  parent.appendChild(button);

  return button;
};

const main = () => {
  const slideshow = document.getElementById("console-slideshow");
  const slides = slideshow.getElementsByClassName("slideshow-items")[0]
    .children;
  const prevButton = makeSlideshowButton("prev", slideshow);
  const nextButton = makeSlideshowButton("next", slideshow);
  let visibleIdx = 0;

  for (let i = 1; i < slides.length; i += 1) {
    makeInvisible(slides[i]);
  }

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

  prevButton.addEventListener("click", handlePreviousClick);
  nextButton.addEventListener("click", handleNextClick);
};

document.addEventListener("DOMContentLoaded", main);
