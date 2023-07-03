/**
 * demo.js
 *
 * Licensed under the MIT license.
 * https://opensource.org/license/mit/
 * 
 * Copyright 2023, WANNABEDEV
 * https://wannabedev.io
 */

 function initializeSlideshow() {
  // Init variables
  const slideshow = document.querySelector('.slideshow');
  const loader = document.querySelector('.loader');
  const navItems = document.querySelectorAll('.nav-item');
  const background = document.querySelectorAll('.background');
  const content = document.querySelectorAll('.content');
  let activeID = null;
  let activeImage = null;
  let activeContent = null;
  let rotation = null;
  const type = "_short";

  imagesLoaded(slideshow, { background: true }, function() {
    // Hide loader
    loader.classList.add('is-loaded');

    // Demo
    gsap.config({
      force3D: false,
    });

    // Set tween values
    function setTweenValues(item) {
      rotation = Number(item.dataset.rotation);
      activeID = item.dataset.id;
      activeImage = item.dataset.bcg;
      activeContent = slideshow.querySelector(`[data-id='content-${activeID}']`);
    }

    // Do tween
    function doTween() {
      content.forEach(function(elem) {
        gsap.set(elem, {
          backgroundImage: '',
        });
        gsap.set(elem.querySelector('.inner'), {
          autoAlpha: 0,
        });
      });

      const timeline = gsap.timeline();
      
      timeline
        .staggerTo(document.querySelectorAll('.inner'), 0, { autoAlpha: 0, ease: 'power4.inOut' }, 0)
        .to(activeContent, { duration: 0.75, autoAlpha: 0, ease: 'power4.inOut' }, '-=0.75')
        .to(activeContent, { duration: 0.75, backgroundImage: `url(${activeImage})` }, '-=0.75')
        .staggerTo(background, 1.5, { rotation: `${rotation}${type}`, transformOrigin: "100% 100%", ease: 'back.out(1.6)' }, 0.075)
        .to(activeContent, { duration: 0.75, autoAlpha: 1, rotation: 0, ease: 'power4.inOut' }, '-=1.5')
        .to(activeContent.querySelector('.inner'), { duration: 0.75, autoAlpha: 1, ease: 'power4.inOut' }, '-=2.5');
        
      timeline.play();
    }

    // Click/hover on items
    navItems.forEach(function(item) {
      item.addEventListener('click', function() {
        doTween();
      });

      item.addEventListener('mouseenter', function() {
        setTweenValues(item);
      });
    });
  });
}

initializeSlideshow();
