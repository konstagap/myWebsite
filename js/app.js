$(function () {
  var $blocks = $('.animBlock.notViewed');
  var $window = $(window);

  $window.on('scroll', function (e) {
    $blocks.each(function (i, elem) {
      if ($(this).hasClass('viewed')) return;

      isScrolledIntoView($(this));
    });
  });
});

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemOffset = 0;

  if (elem.data('offset') != undefined) {
    elemOffset = elem.data('offset');
  }
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  if (elemOffset != 0) {
    // custom offset is updated based on scrolling direction
    if (docViewTop - elemTop >= 0) {
      // scrolling up from bottom
      elemTop = $(elem).offset().top + elemOffset;
    } else {
      // scrolling down from top
      elemBottom = elemTop + $(elem).height() - elemOffset;
    }
  }

  if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
    // once an element is visible exchange the classes
    $(elem).removeClass('notViewed').addClass('viewed');
  }
}

class TypeWriter {
  constructor(txtElement) {
    this.txtElement = txtElement;
    this.beer = '&#127866';
    this.words = [
      'Hello &#128513',
      'Ciao',
      'Bonjour',
      'Willkommen',
      'Hallå',
      'Hola',
      'Здраво&#129309',
      'Ahoj',
      'Merhaba',
      `Привіт!${this.beer}`,
      'Cześć',
      '欢迎',
      'नमस्ते',
      'ようこそ',
      'שלום',
      'Sawubona'
    ];
    this.txt = '';
    this.wordIndex = 0;
    this.wait = 1400;
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 250;

    if (this.isDeleting) {
      typeSpeed /= 1.4;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  // Init TypeWriter
  setTimeout(() => new TypeWriter(txtElement), 1300);
}
