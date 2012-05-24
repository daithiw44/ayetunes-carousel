/**
 * AyeTunes (itunes like carousel)
 * author: @Daith44
 *
 */
var AyeTunes = (function() {
  'use strict';
  /**
   * @constructor AyeTunes
   */
  function AyeTunes() {
    this.options = {};
    this.timer = null;
    this.register = {
      active: 1
    };
  }

  AyeTunes.prototype = {
    /**
     * Initialiser method to get things going.
     * @method init
     * @param object initObj.
     */
    init: function(initObj) {
      var afterSetUp, that = this;
      this.wrapper = document.getElementById(initObj.wrapper);
      if (typeof initObj.callbackfunc === 'function') {
        this.callbackfunc = initObj.callbackfunc;
      }
      /**
       * Requires DOM elements so is called after setUp.
       * @method afterSetUp
       * @param object initObj.
       */
      afterSetUp = function(initObj) {
        this.register.first = initObj.sections[1].id;
        this.ulHolder = this.ulHolder();
        this.nextBtn = this.getBtn('at_nextbtn');
        if (initObj.pausebutton === true || initObj.mouseoverpause === true) {
          this.pauseBtn = this.getBtn('at_pausebtn');
        }
        var ulHolderEl = this.ulHolder,
            container = this.wrapper.children[0],
            that = this;
        this.options = initObj;
        this.createCarouselUL(initObj.sections);
        this.ticker();
        if (initObj.mouseoverpause === true) {
          this.addEvent(container, 'mouseout', function(e) {
            var target = that.pauseBtn;
            that.removeClass(target, 'at_mousepause');
            if (!that.hasClass(that.pauseBtn, 'at_pause')) {
              if (!that.hasClass(target, 'at_play')) {
                that.addClass(target, 'at_play');
              }
              that.ticker();
            }
          }, that);
          this.addEvent(container, 'mouseover', function(e) {
            var target = that.pauseBtn;
            if (that.hasClass(target, 'at_play')) {
              that.removeClass(target, 'at_play');
              if (!that.hasClass(target, 'at_mousepause')) {
                that.addClass(target, 'at_mousepause');
                that.stop();
              }
            }
          }, that);
        }
        if (initObj.pausebutton === true || initObj.mouseoverpause === true) {
          this.addEvent(this.pauseBtn, 'click', function(e) {
            if (initObj.pausebutton === true) {
              var target = that.pauseBtn;
              if (that.hasClass(target, 'at_pause')) {
                that.removeClass(target, 'at_pause');
                if (!that.hasClass(target, 'at_play')) {
                  that.addClass(target, 'at_play');
                }
                that.ticker();
              } else {
                that.removeClass(target, 'at_play');
                if (!that.hasClass(target, 'at_pause')) {
                  that.addClass(target, 'at_pause');
                  that.stop();
                }
              }
            }
            e.preventDefault();
          }, that);
        }
        this.addEvent(this.nextBtn, 'click', function(e) {
          var target = e ? e.target : window.event.srcElement;
          e.preventDefault();
          that.stop();
          that.next();
          if (typeof that.pauseBtn === 'undefined' || that.hasClass(that.pauseBtn, 'at_play')) {
            that.ticker();
          }
        }, that);

        /**
         * Stop all buffered events
         */
        if (window.addEventListener) {
          window.addEventListener('focus', function() {
            that.ticker();
          },false);

          window.addEventListener('blur', function() {
            that.stop();
          },false);
        }
      };
      if (initObj.randomise === true) {
        initObj.sections = initObj.sections.sort(function() {
          return 0.5 - Math.random();
        });
      }
      if (this.wrapper !== null) {
        this.setUp(this.wrapper, afterSetUp, that, initObj);
      }
    },

    /**
     * Build DOM elements.
     * @method setUp
     * @param element wrapper.
     * @param function callback.
     * @param scope that.
     * @param object initObj.
     */
    setUp: function(wrapper, callback, that, initObj) {
      var docFrag = document.createDocumentFragment(),
          nextLnk, carousel, ul, feature, next, pauseplay,
          container = document.createElement('div');
      that.addClass(container, 'at_container');
      that.addClass(container, 'shadowbox');
      carousel = document.createElement('div');
      that.addClass(carousel, 'at_carousel');
      if (initObj.carousel === 'left') {
        that.addClass(carousel, 'at_carouselleft');
      } else {
        that.addClass(carousel, 'at_carouselright');
      }
      ul = document.createElement('ul');
      ul.setAttribute('class', 'at_casebox');
      ul.setAttribute('type', 'carouselscroll');
      ul.setAttribute('style', 'top:0px');
      carousel.appendChild(ul);
      container.appendChild(carousel);
      feature = document.createElement('div');
      feature.setAttribute('class', 'at_feature');
      nextLnk = document.createElement('a');
      nextLnk.setAttribute('href', initObj.sections[that.register.active].link);
      nextLnk.style.height = '420px';
      nextLnk.style.width = '699px';
      feature.appendChild(nextLnk);
      container.appendChild(feature);
      next = document.createElement('a');
      next.setAttribute('href', '');
      that.addClass(next, 'at_nextbtn');
      if (initObj.carousel === 'left') {
        that.addClass(next, 'at_nextbtnleft');
      } else {
        that.addClass(next, 'at_nextbtnright');
      }
      container.appendChild(next);
      if (initObj.pausebutton === true || initObj.mouseoverpause === true) {
        pauseplay = document.createElement('a');
        pauseplay.setAttribute('href', '');
        that.addClass(pauseplay, 'at_pausebtn');
        that.addClass(pauseplay, 'at_play');
        container.appendChild(pauseplay);
      }
      docFrag.appendChild(container);
      wrapper.appendChild(docFrag);
      callback.apply(that, [initObj]);
    },

    /**
     * Start the click.
     * @method ticker
     */
    ticker: function() {
      if (this.timer === null) {
        this.start();
      }
    },

    /**
     * Fired when its time for next part of carousel.
     * @method next
     */
    next: function() {
      var bImg = this.wrapper.children[0].children[1].children[0].children[0],
          closure;
      if (this.register.active < this.options.sections.length - 1) {
        this.register.active++;
      } else {
        this.register.active = 0;
      }
      this.moveUp();
      bImg.style.opacity = 0.4;
      bImg.parentNode.parentNode.style.backgroundImage = "url('" + this.options.sections[this.register.active].lg + "')";
      closure = this.makeBind(this, this.imgSwapAnim);
      setTimeout(closure, 130);
    },

    /**
     * Fade out the big image.
     * @method imgSwapAnim
     */
    imgSwapAnim: function() {
      var that = this, hh = this.wrapper.children[0].children[1].children[0].children[0];
      function fade() {
        var h = hh;
        h.style.opacity -= 0.05;
        if (h.style.opacity > 0.15) {
          h.style.opacity -= 0.05;
          setTimeout(fade, 100);
        } else {
          that.changeBigImage();
        }
      }
      setTimeout(fade, 20);
    },

    /**
     * Start call the timer at intervals.
     * @method start
     */
    start: function() {
      var closure;
      if (this.timer === null) {
        closure = this.makeBind(this, this.next);
        this.timer = setInterval(closure, this.options.auto);
      }
    },

    /**
     * Stop the timer.
     * @method stop
     */
    stop: function() {
      var target = this.pauseBtn;
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    /**
     * create the UL iterate through section to create the lis
     * @method createCarouselUL
     * @param sections
     */
    createCarouselUL: function(sections) {
      var opac = false,
          i, elImg;
      for (i = 0; i < sections.length; i++) {
        if (i === 1) {
          opac = true;
          elImg = document.createElement('img');
          elImg.src = sections[i].lg;
          this.wrapper.children[0].children[1].children[0].appendChild(elImg);
        }
        this.makeIl(sections[i], opac);
        opac = false;
      }
    },

    /**
     * create the lis focusing on the middle 2nd element
     * @method makeIl
     * @param section
     * @param opac
     */
    makeIl: function(section, opac) {
      var docFrag = document.createDocumentFragment(),
          elIl = document.createElement('li'),
          elImg, elHf;
      elIl.setAttribute('class', 'at_case');
      elHf = document.createElement('a');
      elHf.setAttribute('href', section.link);
      elImg = document.createElement('img');
      if (opac === true && this.hasClass(elHf, 'bloomActive') === false) {
        this.addClass(elHf, 'bloomActive');
      }
      if (this.hasClass(elHf, 'bloom') === false) {
        this.addClass(elHf, 'bloom');
      }
      elImg.src = section.sm;
      elHf.appendChild(elImg);
      elIl.appendChild(elHf);
      docFrag.appendChild(elIl);
      this.ulHolder.appendChild(docFrag);
    },

    /**
     * Sets the active Li and calls the animScroll method
     * @method moveUp
     */
    moveUp: function() {
      var li = this.ulHolder.getElementsByTagName('li'),
          el = li[0];
      this.removeClass(li[1].firstChild, 'bloomActive');
      if (this.hasClass(li[2].firstChild, 'bloomActive') === false) {
        this.addClass(li[2].firstChild, 'bloomActive');
      }
      this.animScroll(el);
    },

    /**
     * closure to scroll the ils elements and keep things in balance.
     * @method animScroll
     * @param DOM Element el.
     */
    animScroll: function(el) {
      var that = this,
          ulHolderEl = that.ulHolder;

      function scroll() {
        var h = parseInt(that.ulHolder.style.top, 10);
        h -= 5;
        if (h > -140) {
          h -= 5;
          ulHolderEl.style.top = h + 'px';
          setTimeout(scroll, 20);
        } else {
          ulHolderEl.removeChild(el);
          ulHolderEl.style.top = '0px';
          that.removeClass(el, 'bloomActive');
          ulHolderEl.appendChild(el);
        }
      }
      setTimeout(scroll, 20);
    },

    /**
     * Change the big Image.
     * @method changeBigImage
     */
    changeBigImage: function() {
      var elImg = this.wrapper.children[0].children[1].children[0].children[0];
      elImg.src = this.options.sections[this.register.active].lg;
      elImg.parentNode.setAttribute('href', this.options.sections[this.register.active].link);
      if (typeof this.callbackfunc !== 'undefined') {
        this.callbackfunc(this.options.sections[this.register.active].id);
      }
    },

    /**
     * this always returns the ul element for the carousel
     * @method ulHolder
     */
    ulHolder: function() {
      var container = this.wrapper.children[0],
          i, status, uls = container.getElementsByTagName('ul');
      for (i = 0; i < uls.length; i++) {
        status = uls[i].getAttribute('type');
        if (status === 'carouselscroll') {
          return this.jedi(uls[i]);
        }
      }
    },

    /**
     * closure in jedi and returns the button with the class
     * @method getBtn
     * @parma CSS classN
     */
    getBtn: function(classN) {
      var container = this.wrapper.children[0],
          as, i;
      as = container.getElementsByTagName('a');
      for (i = 0; i < as.length; i++) {
        if (this.hasClass(as[i], classN) === true) {
          return this.jedi(as[i]);
        }
      }
    },

    /**
     * JSLint means putting this in its own function called from gtnBtn.
     * @method jedi
     * @param DOM Element btn.
     */
    jedi: function(btn) {
      return (function() {
        return btn;
      }());
    },

    /**
   * Utilities
   * @methods bindings, makeBind, addEvent, nodeHandler, hasClass, removeClass, addCLass
   */

    bindings: function() {
      this.makeBind(this, this.imgSwapAnim);
    },

    makeBind: function(scope, fn) {
      return function() {
        return fn.apply(scope, Array.prototype.slice.call(arguments));
      };
    },

    addEvent: function(obj, evt, fn, capture) {
      if (obj !== this.nodeHandler(obj)) {
        return false;
      }
      if (window.attachEvent) {
        obj.attachEvent('on' + evt, fn);
      } else {
        if (!capture) {
          capture = false;
        } // capture
        obj.addEventListener(evt, fn, capture);
      }
    },

    nodeHandler: function() {
      var i, element, elements = [];
      for (i = 0; i < arguments.length; i++) {
        element = arguments[i];
        if (typeof element === 'string') {
          element = document.getElementById(element);
        }
        if (arguments.length === 1) {
          return element;
        }
        elements.push(element);
      }
      return elements;
    },

    hasClass: function(element, className) {
      var regex, elClassName = element.className;
      if (!elClassName) {
        return false;
      }
      regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
      return regex.test(element.className);
    },

    removeClass: function(element, className) {
      var elClassName = element.className;
      if (!elClassName) {
        return;
      }
      element.className = elClassName.replace(
          new RegExp('(^|\\s+)' + className + '(\\s+|$)'), ' ');
    },

    addClass: function(element, className) {
      var elClassName = element.className;
      if (elClassName) {
        element.className += ' ' + className;
      } else {
        element.className = className;
      }
    }
  };

  return AyeTunes;

}());
