//? If you are making a multi-page site, i recommend dividing the contents of this file
//? into several parts and connecting them to each page separately.

//? Also, TSDoc is used here, so read the tips. Try hover on some constructor.

// modal window //
import ModalWindowMenu from './modules/modalWindow.js';

/*
  It works like this:
  Finds all elements that contain data-modal-link and .modal-closer.
  The first ones trigger the event of opening the modal window, the second ones close it.
  After clicking on one of these elements, 
  it looks for a block with a name inside data-modal-link and gives it the "active" class.

  Also, when pressed, turns off the scrolling body.
*/
new ModalWindowMenu(
  // i recommend this value.
  '[data-modal-link]',
  '.modal-closer',
  '.fullscreen-navmenu',
  0.5
);


// accordion //
import Accordion from './modules/accord.js';

let someAccrod = new Accordion(
  '.accordion__btn',
  '.accordion__item',
  500
)

// parallax //
import { Parallax, ParallaxElement } from './modules/parallax.js';

let someParallaxMenu = new Parallax(
  '.fullscreen__body',
  768,

  new ParallaxElement(
    '.fullscreen__bg-img', 5),
)


//? your scripts //
