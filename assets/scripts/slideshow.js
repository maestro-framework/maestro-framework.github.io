document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.getElementById("console-slideshow");
  const prevButton = slideshow.getElementsByClassName("prev-button")[0];
  const nextButton = slideshow.getElementsByClassName("next-button")[0];
  const slides = slideshow.getElementsByClassName("slideshow-items")[0].children;
  
  const handlePreviousClick = (e) => {
    console.log("event for previous click:", e);
  };

  const handleNextClick = (e) => {
    console.log("event for next click:", e);
  };

  prevButton.addEventListener("click", handlePreviousClick);
  nextButton.addEventListener("click", handleNextClick);
});