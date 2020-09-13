/* global document, window, hljs, $ */

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#menu-logo");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("#site-navigation a");
  const main = document.querySelector("main");
  const header = document.querySelector("header");
  const ourTeam = document.querySelector("#our-team");
  const homeLink = document.querySelector("#home-link");
  const caseStudyNav = document.querySelector("#case-study nav");
  const caseStudyLink = document.querySelector("#case-study-link");
  const ourTeamLink = document.querySelector("#our-team-link");
  const caseStudyNavUl = document.querySelector("#case-study nav ul");
  const mobileCaseStudyNavUl = document.querySelector("#case-study-mobile ul");

  let topNavVisible = false;
  let smallNavVisible = false;
  const getScrollPosition = () => window.scrollY;
  let scrollPosition = getScrollPosition();
  const getWindowHeight = () => window.innerHeight;
  const getWindowWidth = () => window.innerWidth;
  const isNarrowScreen = () => getWindowWidth() < 1100;

  const logos = [...document.querySelectorAll(".logo-links img")].map(
    (logo) => logo.id.split("-")[0]
  );

  const snakeCaseify = (text) => text.toLowerCase().split(" ").join("-");

  const h2Text = [...document.querySelectorAll("h2")].map((h2) =>
    h2.textContent.split(" ").slice(1).join(" ")
  );

  const getCaseStudyHeadingPositions = () =>
    h2Text.reduce((obj, h2Str) => {
      const selector = `#${snakeCaseify(h2Str.replace("!", ""))}`;
      const h2 = document.querySelector(selector);
      const position = getScrollPosition() + h2.getBoundingClientRect().top;
      obj[`${selector}-nav`] = position;
      return obj;
    }, {});

  const highlightSection = (li, a) => {
    li.style.listStyle = "disc";
    li.style.fontWeight = "bold";
    li.style.color = "#900c3f";
    a.style.color = "#900c3f";
  };

  const mobileCaseStudyLinks = [];

  h2Text.forEach((h2TextStr) => {
    const li = document.createElement("li");
    li.id = snakeCaseify(`${h2TextStr.replace("!", "").toLowerCase()}-nav`);
    const a = document.createElement("a");
    a.href = snakeCaseify(`#${h2TextStr.replace("!", "")}`);
    a.textContent = h2TextStr.toUpperCase();
    a.className = "case-study-anchor";

    const li2 = document.createElement("li");
    li2.id = snakeCaseify(
      `mobile-${h2TextStr.replace("!", "").toLowerCase()}-nav`
    );
    const a2 = document.createElement("a");
    a2.href = snakeCaseify(`#${h2TextStr.replace("!", "")}`);
    a2.textContent = h2TextStr.toUpperCase();

    li.appendChild(a);
    caseStudyNavUl.appendChild(li);

    mobileCaseStudyLinks.push(a2);
    li2.appendChild(a2);
    mobileCaseStudyNavUl.appendChild(li2);
  });

  const changeImgSrc = (tag, url) => {
    document.querySelector(`#${tag}`).src = url;
  };

  const logoUrls = {
    menuWhite: "assets/images/menu-on-dark.png",
    menuBlack: "assets/images/menu-on-light.png",
    maestroWhite: "assets/images/logos/maestro/mark-on-dark.png",
    maestroBlack: "assets/images/logos/maestro/mark-on-light.png",
    githubWhite: "assets/images/icons/github_white.png",
    githubBlack: "assets/images/icons/github_black.png",
    mediumWhite: "assets/images/icons/medium_white.png",
    mediumBlack: "assets/images/icons/medium_black.png",
  };

  const isOnHeader = (logo) => {
    const position = getScrollPosition();
    const logoSelector = `#${logo}-logo`;
    const logoElement = document.querySelector(logoSelector);
    const logoHeight = logoElement.height;
    const logoBottom = +window
      .getComputedStyle(logoElement)
      .bottom.replace("px", "");
    const logoOffset = logoHeight + logoBottom;
    return position < logoOffset;
  };

  const isOnTeamSection = (logo) => {
    const position = getScrollPosition();
    const ourTeamOffset = ourTeam.getBoundingClientRect().top;
    const ourTeamPosition = position + ourTeamOffset;
    const logoSelector = `#${logo}-logo`;
    const logoElement = document.querySelector(logoSelector);
    const logoHeight = logoElement.height;
    const logoBottom = +window
      .getComputedStyle(logoElement)
      .bottom.replace("px", "");
    const logoOffset = logoHeight + logoBottom;
    const logoPosition = position + getWindowHeight() - logoOffset;
    return logoPosition > ourTeamPosition;
  };

  const changeLogoColors = () => {
    logos.forEach((logo) => {
      const onHeader = isOnHeader(logo);
      const onTeam = isOnTeamSection(logo);

      if (onHeader || onTeam) {
        changeImgSrc(`${logo}-logo`, logoUrls[`${logo}Black`]);
      } else {
        changeImgSrc(`${logo}-logo`, logoUrls[`${logo}White`]);
      }
    });
  };

  const handleCaseStudyNavStyles = () => {
    const positions = getCaseStudyHeadingPositions();
    const positionValues = Object.values(positions);
    const positionSelectors = Object.keys(positions);
    const mobileCaseStudyNav = document.querySelector("#case-study-mobile");
    const position = getScrollPosition();

    positionValues.forEach((_, i) => {
      const li = document.querySelector(positionSelectors[i]);
      const a = li.getElementsByTagName("a")[0];
      const currPosition = i > 0 ? positionValues[i] : 0;
      const nextPositionIdx = i + 1;
      const nextPosition = positionValues[nextPositionIdx] || 999999;
      const windowPositionIsAtLi =
        position >= currPosition && position < nextPosition;

      if (windowPositionIsAtLi && !mobileCaseStudyNav.contains(li)) {
        highlightSection(li, a);
      } else {
        if (li.getAttribute("style")) li.removeAttribute("style");
        if (a.getAttribute("style")) a.removeAttribute("style");
      }
    });
  };

  const handleCaseStudyNav = () => {
    const position = getScrollPosition();
    const ourTeamPosition = position + ourTeam.getBoundingClientRect().top;
    const mainPosition = position + main.getBoundingClientRect().top;
    const withinCaseStudy =
      position >= mainPosition &&
      position < ourTeamPosition - getWindowHeight();

    if (getWindowHeight() < 500 || getWindowWidth() < 1100) {
      caseStudyNav.style.display = "none";
    } else if (withinCaseStudy) {
      caseStudyNav.style.display = "block";
      handleCaseStudyNavStyles();
    } else {
      caseStudyNav.style.display = "none";
    }
  };

  const styleNavColors = (bgColor, textColor, hoverColor) => {
    nav.style.backgroundColor = bgColor;
    const links = Array.prototype.slice
      .call(navLinks)
      .concat(mobileCaseStudyLinks);
    links.forEach((link) => {
      link.style.color = textColor;

      link.addEventListener("mouseenter", () => {
        link.style.color = hoverColor;
      });

      link.addEventListener("mouseleave", () => {
        link.style.color = textColor;
      });
    });
  };

  const handleNavColors = () => {
    const onHeader = isOnHeader("menu");
    const onTeam = isOnTeamSection("menu");
    const onMain = !(onHeader || onTeam);
    const isWideScreen = !isNarrowScreen();

    if (isWideScreen && !onMain && topNavVisible) {
      styleNavColors("#9d9ea3", "#1e1d20", "#900c3f");
    } else {
      styleNavColors("#696a6e", "#f5f7ff", "#900c3f");
    }
  };

  const showNav = () => {
    const position = getScrollPosition();
    const narrowScreen = isNarrowScreen();
    topNavVisible = true;

    handleNavColors();
    scrollPosition = position;

    if (narrowScreen) document.body.style.backgroundColor = "#9d9ea3";
    $(nav).slideDown("fast");
  };

  const showSite = () => {
    const siteElements = [header, main, ourTeam, document.body];
    siteElements.forEach((el) => el.removeAttribute("style"));
  };

  const hideSite = () => {
    header.style.display = "none";
    main.style.display = "none";
    ourTeam.style.display = "none";
  };

  const hideNav = () => {
    smallNavVisible = false;
    topNavVisible = false;
    handleNavColors();
    $(nav).slideUp("fast");
    showSite();
  };

  const toggleNav = () => {
    if (smallNavVisible) {
      hideNav();
      window.scrollTo(0, scrollPosition);
    } else {
      showNav();
      smallNavVisible = true;
      hideSite();
    }
  };

  const handleNavDisplay = () => {
    if (isNarrowScreen()) {
      toggleNav();
    } else {
      showNav();
    }
  };

  menu.addEventListener("click", handleNavDisplay);
  main.addEventListener("mouseenter", hideNav);
  ourTeam.addEventListener("mouseenter", hideNav);
  header.addEventListener("mouseenter", hideNav);
  homeLink.addEventListener("click", hideNav);
  caseStudyLink.addEventListener("click", hideNav);
  mobileCaseStudyLinks.forEach((link) =>
    link.addEventListener("click", hideNav)
  );
  ourTeamLink.addEventListener("click", hideNav);

  document.addEventListener("scroll", () => {
    if (!smallNavVisible) {
      changeLogoColors();
      handleCaseStudyNav();
    }
    handleNavColors();
  });

  window.addEventListener("resize", () => {
    handleCaseStudyNav();
    handleNavColors();
    if (!isNarrowScreen() && smallNavVisible) {
      showSite();
      hideNav();
      window.scrollTo(0, scrollPosition);
    }
  });

  caseStudyNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const positions = getCaseStudyHeadingPositions();
      const positionKey = `#${e.target.href.split("#")[1]}-nav`;
      const newScrollPosition = positions[positionKey];
      window.scrollTo(0, newScrollPosition + 5);
    }
  });

  hljs.initHighlightingOnLoad();
});
